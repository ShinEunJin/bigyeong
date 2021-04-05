import axios from "axios"
import { AUTH_USER, ADD_TAKE, LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "./types"

export const loginUser = async (dataToSubmit) => {
    const { data: request } = await axios.post("/api/users/login", dataToSubmit)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const registerUser = async (dataToSubmit) => {
    const { data: request } = await axios.post("/api/users/register", dataToSubmit)
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const logout = async () => {
    const { data: request } = await axios.get("/api/users/logout")
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export const auth = async () => {
    const { data: request } = await axios.get("/api/users/auth")
    return {
        type: AUTH_USER,
        payload: request
    }
}

export const addTake = async (productId) => {
    let body = { productId }
    const { data: request } = await axios.post("/api/users/addTake", body)
    return {
        type: ADD_TAKE,
        payload: request
    }
}