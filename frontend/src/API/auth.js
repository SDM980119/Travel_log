import apiClient from "./axios";

export const check = (field, value) =>{
    return apiClient.post('/api/check' , {field, value,})
}


// 회원가입
export const signUp = (userData) => {
    return apiClient.post('/api/SignUp', userData);
};

// export const login = (id, pw)=>{

// }