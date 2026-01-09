import apiClient from "./axios"

export const reviewWrite = (formData) => {
    return apiClient.post("/api//review/write",formData)
}