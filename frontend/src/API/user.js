import apiClient from "./axios";

export const mypage = () => {
    return apiClient.get("/api/mypage",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
}