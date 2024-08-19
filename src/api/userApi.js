import { axiosInstance } from "./axiosInstance";

export async function signup(signupData) {
    const data = await axiosInstance.post('/signup', signupData)
    return data
}

export async function login(loginData) {
    const data = await axiosInstance.post('/login', loginData)
    return data
}