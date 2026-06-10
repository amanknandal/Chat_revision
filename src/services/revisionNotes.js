import { api } from "./api"

export const listRevisionNotes = async () => {
    const { data } = await api.get("/revision/")
    return data
}

export const createRevisionNote = async (payload) => {
    const { data } = await api.post("/revision/", payload)
    return data
}

export const updateRevisionNote = async (noteId, payload) => {
    const { data } = await api.put(`/revision/${noteId}`, payload)
    return data
}

export const deleteRevisionNote = async (noteId) => {
    const { data } = await api.delete(`/revision/${noteId}`)
    return data
}
