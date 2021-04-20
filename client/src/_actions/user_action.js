import axios from "axios"
import { AUTH_USER, ADD_TAKE, ADD_LIKE, LOGIN_USER, REGISTER_USER, LOGOUT_USER, REMOVE_TAKE, GET_LIKE, GET_MY_PRODUCTS, UPDATE_PROFILE } from "./types"

export const loginUser = async (dataToSubmit) => {
    const { data } = await axios.post("/api/users/login", dataToSubmit)
    return {
        type: LOGIN_USER,
        payload: data
    }
}

export const registerUser = async (dataToSubmit) => {
    const { data } = await axios.post("/api/users/register", dataToSubmit)
    return {
        type: REGISTER_USER,
        payload: data
    }
}

export const logout = async () => {
    const { data } = await axios.get("/api/users/logout")
    return {
        type: LOGOUT_USER,
        payload: data
    }
}

export const auth = async () => {
    const { data } = await axios.get("/api/users/auth")
    return {
        type: AUTH_USER,
        payload: data
    }
}

export const addTake = async (productId) => {
    let body = { productId }
    const { data } = await axios.post("/api/users/addTake", body)
    return {
        type: ADD_TAKE,
        payload: data
    }
}

export const addLike = async (productId) => {
    let body = { productId }
    const { data } = await axios.post("/api/users/addLike", body)
    if (data.myProduct) {
        return {
            type: null
        }
    } else {
        return {
            type: ADD_LIKE,
            payload: data
        }
    }
}

export const removeTake = async (productId) => {
    let body = { productId }
    const { data } = await axios.post("/api/users/removeTake", body)
    return {
        type: REMOVE_TAKE,
        payload: data
    }
}

export const getLike = async () => {
    const { data } = await axios.get("/api/users/getlike")
    return {
        type: GET_LIKE,
        payload: data
    }
}

export const getMyProducts = async () => {
    const { data } = await axios.get("/api/users/getMyProducts")
    return {
        type: GET_MY_PRODUCTS,
        payload: data
    }
}

export const updateProfile = async (dataToSubmit) => {
    const { data } = await axios.post("/api/users/updateProfile", dataToSubmit)
    return {
        type: UPDATE_PROFILE,
        payload: data
    }
}