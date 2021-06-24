//User
const REGISTER = "/api/users/register"
const REGISTER_EMAIL = "/api/users/register-email"
const LOGIN = "/api/users/login"
const LOGOUT = "/api/users/logout"
const AUTH = "/api/users/auth"

const GET_USER_PRODUCTS = "/api/users/products"
const AVATAR = "/api/users/avatar"
const PROFILE = "/api/users/profile"
const USER_DELETE = "/api/users/delete"

const USER_LIKE = "/api/users/like"
const USER_TAKE = "/api/users/take"

//Product
const REP_PRODUCT = "/api/product/represent"

const PRODUCT = "/api/product"
const PRODUCTS = "/api/products"
const PRODUCT_LIKE = "/api/product/like"
const PRODUCT_TAKE = "/api/product/take"
const PRODUCT_COMMENTS = "/api/product/comments"

const PRODUCT_GALLERY = "/api/product/gallery"

const PRODUCT_ALL = "/api/product/products"
const PRODUCT_DETAIL = "/api/product/detail"
const PRODUCT_IMAGE = "/api/product/image"
const PRODUCT_FIND_DETAIL = "/api/product/findDetail"

const routes = {
  register: REGISTER,
  registerEmail: REGISTER_EMAIL,
  login: LOGIN,
  logout: LOGOUT,
  auth: AUTH,
  getUserProducts: GET_USER_PRODUCTS,
  avatar: AVATAR,
  profile: PROFILE,
  userDelete: USER_DELETE,
  userLike: USER_LIKE,
  userTake: USER_TAKE,
  repProduct: REP_PRODUCT,
  product: PRODUCT,
  products: PRODUCTS,
  productAll: PRODUCT_ALL,
  productDetail: PRODUCT_DETAIL,
  productImage: PRODUCT_IMAGE,
  productLike: PRODUCT_LIKE,
  productTake: PRODUCT_TAKE,
  productComments: PRODUCT_COMMENTS,
  productGallery: PRODUCT_GALLERY,
  productFindDetail: PRODUCT_FIND_DETAIL,
}

export default routes
