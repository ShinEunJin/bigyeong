import axios from "axios"
import routes from "../routes"
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT_LIKE,
  GET_PRODUCTS_MORE,
  GET_REP_PRODUCT,
  PRODUCTS,
  PRODUCT,
  REP_PRODUCT,
} from "./types"
import { asyncThunk } from "./utils"

export const getProducts = asyncThunk(
  GET_PRODUCTS,
  ({ sortBy, skip, limit, region, searchTerm }) =>
    axios.get(
      `${routes.apiProductSearch}?sortBy=${sortBy}&skip=${skip}&limit=${limit}&region=${region}&searchTerm=${searchTerm}`
    ),
  PRODUCTS
)

export const getProductsMore = async ({
  sortBy,
  skip,
  limit,
  region,
  searchTerm,
}) => {
  const { data } = await axios.get(
    `${routes.apiProductSearch}?sortBy=${sortBy}&skip=${skip}&limit=${limit}&region=${region}&searchTerm=${searchTerm}`
  )
  return {
    type: GET_PRODUCTS_MORE,
    payload: data.products,
  }
}

export const getProduct = asyncThunk(
  GET_PRODUCT,
  ({ id }) => axios.get(`${routes.apiProduct}?id=${id}`),
  PRODUCT
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

export const getRepProduct = asyncThunk(
  GET_REP_PRODUCT,
  () => axios.get(`/api/product/represent`),
  REP_PRODUCT
)
