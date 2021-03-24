import axios from "axios"
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from "./types"

export const loginUser = async (dataToSubmit) => {
    const request = await axios.post("/api/users/login", dataToSubmit).then(res => res.data)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const registerUser = async (dataToSubmit) => {
    const request = await axios.post("/api/users/register", dataToSubmit).then(res => res.data)
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const auth = async () => {
    const request = await axios.get("/api/users/auth").then(res => res.data)
    return {
        type: AUTH_USER,
        payload: request
    }
}