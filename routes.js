//User
const REGISTER = "/api/users/register"
const LOGIN = "/api/users/login"
const LOGOUT = "/api/users/logout"
const AUTH = "/api/users/auth"
const ADD_TAKE = "/api/users/addTake"

//Product
const PRODUCT = "/api/product"
const PRODUCT_ALL = "/api/product/products"
const PRODUCT_DETAIL = "/api/product/detail"
const PRODUCT_IMAGE = "/api/product/image"

const routes = {
    register: REGISTER,
    login: LOGIN,
    logout: LOGOUT,
    auth: AUTH,
    addTake: ADD_TAKE,
    product: PRODUCT,
    productAll: PRODUCT_ALL,
    productDetail: PRODUCT_DETAIL,
    productImage: PRODUCT_IMAGE
}

export default routes