//User
const REGISTER = "/api/users/register"
const LOGIN = "/api/users/login"
const LOGOUT = "/api/users/logout"
const AUTH = "/api/users/auth"

//Product
const PRODUCT = "/api/product"
const PRODUCT_ALL = "/api/product/products"
const PRODUCT_IMAGE = "/api/product/image"

const routes = {
    register: REGISTER,
    login: LOGIN,
    logout: LOGOUT,
    auth: AUTH,
    product: PRODUCT,
    productAll: PRODUCT_ALL,
    productImage: PRODUCT_IMAGE
}

export default routes