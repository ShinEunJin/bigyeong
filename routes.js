//User
const REGISTER = "/api/users/register"
const LOGIN = "/api/users/login"
const LOGOUT = "/api/users/logout"
const AUTH = "/api/users/auth"
const ADD_TAKE = "/api/users/addTake"
const ADD_LIKE = "/api/users/addLike"

//Product
const PRODUCT = "/api/product"
const PRODUCT_ALL = "/api/product/products"
const PRODUCT_DETAIL = "/api/product/detail"
const PRODUCT_IMAGE = "/api/product/image"
const PRODUCT_LIKE = "/api/product/like"

const routes = {
    register: REGISTER,
    login: LOGIN,
    logout: LOGOUT,
    auth: AUTH,
    addTake: ADD_TAKE,
    addLike: ADD_LIKE,
    product: PRODUCT,
    productAll: PRODUCT_ALL,
    productDetail: PRODUCT_DETAIL,
    productImage: PRODUCT_IMAGE,
    productLike: PRODUCT_LIKE
}

export default routes