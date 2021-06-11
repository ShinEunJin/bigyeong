import axios from "axios"
import {
  AUTH_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  UPDATE_PROFILE,
  UPDATE_LIKE,
  UPDATE_USER_TAKE,
} from "./types"

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

export const updateProfile = async (dataToSubmit) => {
  const { data } = await axios.patch("/api/users/profile", dataToSubmit)
  return {
    type: UPDATE_PROFILE,
    payload: data,
  }
}

export const updateUserLike = async (dataToSubmit) => {
  const {
    data: { like },
  } = await axios.patch("/api/users/like", dataToSubmit)
  return {
    type: UPDATE_LIKE,
    payload: like,
  }
}

export const updateUserTake = async (dataToSubmit) => {
  const {
    data: { take },
  } = await axios.patch("/api/users/take", dataToSubmit)
  return {
    type: UPDATE_USER_TAKE,
    payload: take,
  }
}
