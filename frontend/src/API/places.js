import apiClient from "./axios";

export const getPlaces = (type) => {
    return apiClient.get("/api/places",{
        params: {type}
    })
}