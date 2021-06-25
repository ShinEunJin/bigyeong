//API
const API_PRODUCT = "/api/product"
const API_PRODUCTS = "/api/products"
const API_USER = "/api/user"

const HOME = "/"

//User
const REGISTER = "/register"
const AUTH_EMAIL = "/email"
const LOGIN = "/login"
const LOGOUT = "/logout"
const AUTH = "/auth"

const PROFILE = "/api/users/profile"

const USER_LIKE = "/api/users/like"
const USER_TAKE = "/api/users/take"

//Product

const REP_PRODUCT = "/api/product/represent"

const REPRESENT = "/represent"
const MAP = "/map"
const SEARCH = "/search"

const LIKE = "/like"
const PRODUCT_TAKE = "/api/product/take"
const PRODUCT_COMMENTS = "/api/product/comments"

const IMAGE = "/image"

const routes = {
  apiProduct: API_PRODUCT,
  apiProducts: API_PRODUCTS,
  apiUser: API_USER,
  home: HOME,
  map: MAP,
  search: SEARCH,
  represent: REPRESENT,
  register: REGISTER,
  authEmail: AUTH_EMAIL,
  login: LOGIN,
  logout: LOGOUT,
  auth: AUTH,
  profile: PROFILE,
  userLike: USER_LIKE,
  userTake: USER_TAKE,
  repProduct: REP_PRODUCT,
  image: IMAGE,
  like: LIKE,
  productTake: PRODUCT_TAKE,
  productComments: PRODUCT_COMMENTS,
}

export default routes
