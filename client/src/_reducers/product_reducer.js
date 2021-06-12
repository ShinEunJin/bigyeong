import { handleAsyncActions } from "./utils"
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_MORE,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  UPDATE_PRODUCT_LIKE,
} from "../_actions/types"

const initialState = {
  loading: false,
  product: null,
  products: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
    case GET_PRODUCTS_SUCCESS:
    case GET_PRODUCTS_FAILURE:
      return handleAsyncActions(GET_PRODUCTS, "products")(state, action)
    case GET_PRODUCTS_MORE:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      }
    case GET_PRODUCT:
    case GET_PRODUCT_SUCCESS:
    case GET_PRODUCT_FAILURE:
      return handleAsyncActions(GET_PRODUCT, "product")(state, action)
    case UPDATE_PRODUCT_LIKE:
      return {
        ...state,
        product: {
          ...state.product,
          likes: action.payload,
        },
      }
    default:
      return state
  }
}
