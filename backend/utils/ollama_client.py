import requests
import os

OLLAMA_URL = os.getenv(
    "OLLAMA_URL",
    "http://127.0.0.1:11434/api/generate"
)
OLLAMA_MODEL = os.getenv(
    "OLLAMA_MODEL",
    "phi3:mini"
)

def ask_ollama(prompt):
    try:
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        }
        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=120
        )
        if response.status_code != 200:
            raise Exception(
                f"Ollama API Error: {response.text}"
            )
        data = response.json()
        if "response" in data:
            return data["response"]
        if "results" in data and data["results"]:
            first_result = data["results"][0]
            if isinstance(first_result, dict):
                return first_result.get(
                    "content",
                    first_result.get(
                        "response",
                        "No response generated."
                    )
                )
        return "No response generated."
    except requests.exceptions.Timeout:
        raise Exception(
            "Ollama request timed out"
        )
    except requests.exceptions.ConnectionError:
        raise Exception(
            "Could not connect to Ollama"
        )
    except Exception as e:
        raise Exception(
            f"Ollama generation failed: {str(e)}"
        )
