import axios from "axios"
import {
  AUTH_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_MY_PRODUCTS,
  UPDATE_PROFILE,
  UPDATE_LIKE,
} from "./types"
import { asyncThunk } from "./utils"

export const loginUser = async (dataToSubmit) => {
  const { data } = await axios.post("/api/users/login", dataToSubmit)
  return {
    type: LOGIN_USER,
    payload: data,
  }
}

export const registerUser = async (dataToSubmit) => {
  const { data } = await axios.post("/api/users/register", dataToSubmit)
  return {
    type: REGISTER_USER,
    payload: data,
  }
}

export const logout = async () => {
  const { data } = await axios.get("/api/users/logout")
  return {
    type: LOGOUT_USER,
    payload: data,
  }
}

export const auth = async () => {
  const { data } = await axios.get("/api/users/auth")
  return {
    type: AUTH_USER,
    payload: data,
  }
}

export const getMyProducts = async () => {
  const { data } = await axios.get("/api/users/getMyProducts")
  return {
    type: GET_MY_PRODUCTS,
    payload: data,
  }
}

export const updateProfile = async (dataToSubmit) => {
  const { data } = await axios.post("/api/users/updateProfile", dataToSubmit)
  return {
    type: UPDATE_PROFILE,
    payload: data,
  }
}

export const updateUserLike = asyncThunk(UPDATE_LIKE, (dataToSubmit) =>
  axios.patch("/api/users/like", dataToSubmit)
)
