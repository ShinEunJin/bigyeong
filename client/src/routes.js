//route
const FIND_BY_MAP = "/find_map"
const FIND_BY_SEARCH = "/find_search"

//product
const PRODUCT = "/product/:id"

const API_PRODUCT = "/api/product"
const API_PRODUCT_MAP = "/api/product/map"
const API_PRODUCT_SEARCH = "/api/product/search"
const API_PRODUCT_REPRESENT = "/api/product/represent"

//api user
const API_USER_REGISTER = "/api/user/register"
const API_USER_EMAIL = "/api/user/email"

//api comment
const API_COMMENT = "/api/comment"

const routes = {
  findByMap: FIND_BY_MAP,
  findBySearch: FIND_BY_SEARCH,
  product: (id) => {
    if (id) {
      return `/product/${id}`
    } else {
      return PRODUCT
    }
  },
  apiProduct: API_PRODUCT,
  apiProductMap: API_PRODUCT_MAP,
  apiProductSearch: API_PRODUCT_SEARCH,
  apiPRoductRepresent: API_PRODUCT_REPRESENT,
  apiUserRegister: API_USER_REGISTER,
  apiUserEmail: API_USER_EMAIL,
  apiComment: API_COMMENT,
}

export default routes
