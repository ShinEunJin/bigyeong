//User
const REGISTER = "/api/users/register"
const REGISTER_EMAIL = "/api/users/register-email"
const LOGIN = "/api/users/login"
const LOGOUT = "/api/users/logout"
const AUTH = "/api/users/auth"
const GET_MY_PRODUCTS = "/api/users/getMyProducts"
const UPLOAD_AVATAR = "/api/users/uploadAvatar"
const UPDATE_PROFILE = "/api/users/updateProfile"

const USER_LIKE = "/api/users/like"
const USER_TAKE = "/api/users/take"

//Product
const PRODUCT = "/api/product"
const PRODUCTS = "/api/products"

const PRODUCT_ALL = "/api/product/products"
const PRODUCT_DETAIL = "/api/product/detail"
const PRODUCT_IMAGE = "/api/product/image"
const PRODUCT_LIKE = "/api/product/like"
const PRODUCT_TAKE = "/api/product/take"
const PRODUCT_COMMENT = "/api/product/comments"
const PRODUCT_GET_COMMENT = "/api/product/getComments"
const PRODUCT_REMOVE_COMMENT = "/api/product/removeComment"
const PRODUCT_REVISE = "/api/product/revise"
const PRODUCT_REMOVE = "/api/product/remove"
const PRODUCT_FIND_DETAIL = "/api/product/findDetail"

const routes = {
  register: REGISTER,
  registerEmail: REGISTER_EMAIL,
  login: LOGIN,
  logout: LOGOUT,
  auth: AUTH,
  getMyProducts: GET_MY_PRODUCTS,
  uploadAvatar: UPLOAD_AVATAR,
  updateProfile: UPDATE_PROFILE,
  userLike: USER_LIKE,
  userTake: USER_TAKE,
  product: PRODUCT,
  products: PRODUCTS,
  productAll: PRODUCT_ALL,
  productDetail: PRODUCT_DETAIL,
  productImage: PRODUCT_IMAGE,
  productLike: PRODUCT_LIKE,
  productTake: PRODUCT_TAKE,
  productComment: PRODUCT_COMMENT,
  productGetComment: PRODUCT_GET_COMMENT,
  productRemoveComment: PRODUCT_REMOVE_COMMENT,
  productRevise: PRODUCT_REVISE,
  productRemove: PRODUCT_REMOVE,
  productFindDetail: PRODUCT_FIND_DETAIL,
}

export default routes
