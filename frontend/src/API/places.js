import apiClient from "./axios";

export const getHomePlace = (type) => {
    return apiClient.get("/api/main",{
        params: {type}
    })
}

export const getPlaces = (type) => {
    return apiClient.get("/api/places",{
        params: {type}
    })
}

export const getPlaceId = (id) => {
    return apiClient.get(`/api/places/detail/${id}`);
};
