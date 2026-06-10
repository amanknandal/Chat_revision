import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const signupUser = async (payload) => {
    const { data } = await api.post("/auth/signup", payload)
    return data
}

export const loginUser = async (payload) => {
    const { data } = await api.post("/auth/login", payload)
    return data
}

export const uploadPDF = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    const { data } = await api.post("/upload/pdf", formData, {
        headers: {
            "Content-Type": undefined
        }
    })
    return data
}

export const askQuestion = async (question, session_id) => {
    const { data } = await api.post("/chat/ask", {
        question,
        session_id
    })
    return data
}
