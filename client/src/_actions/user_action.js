import axios from "axios"
import {
  AUTH_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  UPDATE_PROFILE,
  UPDATE_USER_TAKE,
} from "./types"

export const loginUser = async (dataToSubmit) => {
  const { data } = await axios.post("/api/user/login", dataToSubmit)
  return {
    type: LOGIN_USER,
    payload: data,
  }
}

export const registerUser = async (dataToSubmit) => {
  const { data } = await axios.post("/api/user/register", dataToSubmit)
  return {
    type: REGISTER_USER,
    payload: data,
  }
}

export const logout = async () => {
  const { data } = await axios.get("/api/user/logout")
  return {
    type: LOGOUT_USER,
    payload: data,
  }
}

//유저 정보를 가져옴
export const auth = async () => {
  const { data } = await axios.get("/api/user/auth")
  return {
    type: AUTH_USER,
    payload: data,
  }
}

export const updateProfile = async (dataToSubmit) => {
  const { data } = await axios.patch("/api/user/profile", dataToSubmit)
  return {
    type: UPDATE_PROFILE,
    payload: data,
  }
}

// 유저 찜목록 업데이트
export const updateUserTake = async (dataToSubmit) => {
  const {
    data: { take },
  } = await axios.patch("/api/user/take", dataToSubmit)
  return {
    type: UPDATE_USER_TAKE,
    payload: take,
  }
}
