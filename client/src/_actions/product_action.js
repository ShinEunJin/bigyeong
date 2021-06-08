import axios from "axios"
import { GET_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT_LIKE } from "./types"
import { asyncThunk } from "./utils"

export const getProducts = asyncThunk(
  GET_PRODUCTS,
  ({ sortBy, skip, limit, region, searchTerm }) =>
    axios.get(
      `/api/products?sortBy=${sortBy}&skip=${skip}&limit=${limit}&region=${region}&searchTerm=${searchTerm}`
    )
)

export const getProduct = asyncThunk(GET_PRODUCT, ({ id }) =>
  axios.get(`/api/product?id=${id}`)
)

export const updateProductLike = async (dataToSubmit) => {
  const {
    data: { likeNum },
  } = await axios.patch("/api/product/like", dataToSubmit)
  return {
    type: UPDATE_PRODUCT_LIKE,
    payload: likeNum,
  }
}
