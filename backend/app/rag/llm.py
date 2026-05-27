import requests
from app.config.settings import Config

SYSTEM_PROMPT="""
You are an AI educational assistant.

Rules:
1.Answer only from provided context
2.If answer is missing say:
"I could not find this information in the uploaded PDF."
3.Keep answers accurate
4.Give concise educational responses
5.Do not hallucinate
"""

def generate_answer(question,contexts):
    try:
        context_text="\n\n".join(
            [
                f"Page {item['page']}:\n{item['text']}"
                for item in contexts
            ]
        )

        prompt=f"""
{SYSTEM_PROMPT}

Context:
{context_text}

Question:
{question}

Answer:
"""

        response=requests.post(
            Config.OLLAMA_URL,
            json={
                "model":Config.OLLAMA_MODEL,
                "prompt":prompt,
                "stream":False
            },
            timeout=180
        )

        if response.status_code!=200:
            raise Exception(
                response.text
            )

        data=response.json()

        return data.get(
            "response",
            "No response generated"
        )

    except Exception as e:
        raise Exception(
            f"LLM generation failed: {str(e)}"
        )