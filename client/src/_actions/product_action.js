import axios from "axios"
import { GET_PRODUCT, GET_PRODUCTS } from "./types"
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
