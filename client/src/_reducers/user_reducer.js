import {
  AUTH_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  UPDATE_LIKE,
  GET_MY_PRODUCTS,
  UPDATE_PROFILE,
  UPDATE_USER_TAKE,
} from "../_actions/types"

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, login: action.payload }
    case REGISTER_USER:
      return { ...state, register: action.payload }
    case LOGOUT_USER:
      return { ...state, logout: action.payload }
    case AUTH_USER:
      return { ...state, userData: action.payload }
    case UPDATE_LIKE:
      return {
        ...state,
        userData: { ...state.userData, likes: action.payload },
      }
    case UPDATE_USER_TAKE:
      return {
        ...state,
        userData: { ...state.userData, take: action.payload },
      }
    case GET_MY_PRODUCTS:
      return {
        ...state,
        userData: { ...state.userData, products: action.payload },
      }
    case UPDATE_PROFILE:
      return { ...state, userData: action.payload }
    default:
      return state
  }
}
