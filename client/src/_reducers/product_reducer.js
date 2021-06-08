import { handleAsyncActions } from "./utils"
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  UPDATE_PRODUCT_LIKE,
  UPDATE_PRODUCT_LIKE_SUCCESS,
  UPDATE_PRODUCT_LIKE_FAILURE,
} from "../_actions/types"

const initialState = {
  loading: false,
  data: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
    case GET_PRODUCTS_SUCCESS:
    case GET_PRODUCTS_FAILURE:
      return handleAsyncActions(GET_PRODUCTS)(state, action)
    case GET_PRODUCT:
    case GET_PRODUCT_SUCCESS:
    case GET_PRODUCT_FAILURE:
      return handleAsyncActions(GET_PRODUCT)(state, action)
    case UPDATE_PRODUCT_LIKE:
      return {
        ...state,
        data: {
          ...state.data,
          product: { ...state.data.product, likes: action.payload },
        },
      }
    default:
      return state
  }
}
