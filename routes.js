//User
const REGISTER = "/api/users/register"
const LOGIN = "/api/users/login"
const LOGOUT = "/api/users/logout"
const AUTH = "/api/users/auth"

//Product
const PRODUCT = "/api/product"
const PRODUCT_IMAGE = "/api/product/image"

const routes = {
    register: REGISTER,
    login: LOGIN,
    logout: LOGOUT,
    auth: AUTH,
    product: PRODUCT,
    productImage: PRODUCT_IMAGE
}

export default routes