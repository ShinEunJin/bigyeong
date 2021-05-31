import axios from "axios"
import { GET_PRODUCTS } from "./types"
import { asyncThunk } from "./utils"

export const getProducts = asyncThunk(
  GET_PRODUCTS,
  ({ category, skip, limit }) =>
    axios.get(`/api/products?category=${category}&skip=${skip}&limit=${limit}`)
)
