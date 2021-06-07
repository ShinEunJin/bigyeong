import {
  AUTH_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  UPDATE_LIKE,
  UPDATE_LIKE_FAILURE,
  UPDATE_LIKE_SUCCESS,
  GET_MY_PRODUCTS,
  UPDATE_PROFILE,
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
