import { handleAsyncActions } from "./utils"
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
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
      const reducer = handleAsyncActions(GET_PRODUCTS)
      return reducer(state, action)
    default:
      return state
  }
}
