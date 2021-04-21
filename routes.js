//User
const REGISTER = "/api/users/register"
const LOGIN = "/api/users/login"
const LOGOUT = "/api/users/logout"
const AUTH = "/api/users/auth"
const ADD_TAKE = "/api/users/addTake"
const ADD_LIKE = "/api/users/addLike"
const REMOVE_TAKE = "/api/users/removeTake"
const GET_LIKE = "/api/users/getLike"
const GET_MY_PRODUCTS = "/api/users/getMyProducts"
const UPLOAD_AVATAR = "/api/users/uploadAvatar"
const UPDATE_PROFILE = "/api/users/updateProfile"

//Product
const PRODUCT = "/api/product"
const PRODUCT_ALL = "/api/product/products"
const PRODUCT_DETAIL = "/api/product/detail"
const PRODUCT_IMAGE = "/api/product/image"
const PRODUCT_LIKE = "/api/product/like"
const PRODUCT_TAKE = "/api/product/take"
const PRODUCT_COMMENT = "/api/product/comments"
const PRODUCT_GET_COMMENT = "/api/product/getComments"

const routes = {
    register: REGISTER,
    login: LOGIN,
    logout: LOGOUT,
    auth: AUTH,
    addTake: ADD_TAKE,
    addLike: ADD_LIKE,
    removeTake: REMOVE_TAKE,
    getLike: GET_LIKE,
    getMyProducts: GET_MY_PRODUCTS,
    uploadAvatar: UPLOAD_AVATAR,
    updateProfile: UPDATE_PROFILE,
    product: PRODUCT,
    productAll: PRODUCT_ALL,
    productDetail: PRODUCT_DETAIL,
    productImage: PRODUCT_IMAGE,
    productLike: PRODUCT_LIKE,
    productTake: PRODUCT_TAKE,
    productComment: PRODUCT_COMMENT,
    productGetComment: PRODUCT_GET_COMMENT
}

export default routes