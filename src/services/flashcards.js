import { api } from "./api"

export const listFlashcards = async () => {
    const { data } = await api.get("/flashcards/")
    return data
}

export const createFlashcard = async (payload) => {
    const { data } = await api.post("/flashcards/", payload)
    return data
}

export const updateFlashcard = async (flashcardId, payload) => {
    const { data } = await api.put(`/flashcards/${flashcardId}`, payload)
    return data
}

export const deleteFlashcard = async (flashcardId) => {
    const { data } = await api.delete(`/flashcards/${flashcardId}`)
    return data
}
