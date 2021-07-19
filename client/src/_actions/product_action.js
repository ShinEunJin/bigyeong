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

//여러 사진들을 불러올 때 사용
export const getProducts = asyncThunk(
  GET_PRODUCTS,
  ({ sortBy, skip, limit, region, searchTerm }) =>
    axios.get(
      `${routes.apiProductSearch}?sortBy=${sortBy}&skip=${skip}&limit=${limit}&region=${region}&searchTerm=${searchTerm}`
    ),
  PRODUCTS
)

// 무한 스크롤 작동 할 때 사용
// thunk를 쓰면 부드럽지가 않아 그냥 일반 promise만 사용
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

// DetailProduct에 사용
export const getProduct = asyncThunk(
  GET_PRODUCT,
  ({ id }) => axios.get(`${routes.apiProduct}?id=${id}`),
  PRODUCT
)

//좋아요 기능을 위해 만들었지만 일단 사용하지 않고 있음
export const updateProductLike = async (dataToSubmit) => {
  const {
    data: { likeNum },
  } = await axios.patch("/api/product/like", dataToSubmit)
  return {
    type: UPDATE_PRODUCT_LIKE,
    payload: likeNum,
  }
}

//홈 화면에 사진 불러오는데 사용
export const getRepProduct = asyncThunk(
  GET_REP_PRODUCT,
  () => axios.get(`/api/product/represent`),
  REP_PRODUCT
)
