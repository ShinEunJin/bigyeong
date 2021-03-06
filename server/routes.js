//API
const API_PRODUCT = "/api/product"
const API_USER = "/api/user"
const API_COMMNET = "/api/comment"
const API_POST = "/api/post"
const API_REPORT = "/api/report"

//User
const USER_REGISTER = "/register"
const USER_EMAIL = "/email"
const USER_LOGIN = "/login"
const USER_LOGOUT = "/logout"
const USER_AUTH = "/auth"
const USER_PROFILE = "/profile"
const USER_TAKE = "/take"
const USER_AVATAR = "/avatar"

//Product
const PRODUCT_REPRESENT = "/represent"
const PRODUCT_MAP = "/map"
const PRODUCT_SEARCH = "/search"
const PRODUCT_GALLERY = "/gallery"
const PRODUCT_IMAGE = "/image"

//Post
const POST_POSTS = "/posts"

const routes = {
  apiProduct: API_PRODUCT,
  apiUser: API_USER,
  apiComment: API_COMMNET,
  apiPost: API_POST,
  apiReport: API_REPORT,
  //user
  userAuthEmail: USER_EMAIL,
  userRegister: USER_REGISTER,
  userLogin: USER_LOGIN,
  userLogout: USER_LOGOUT,
  userAuth: USER_AUTH,
  userProfile: USER_PROFILE,
  userTake: USER_TAKE,
  userAvatar: USER_AVATAR,
  //product
  findByMap: PRODUCT_MAP,
  findBySearch: PRODUCT_SEARCH,
  productRepresent: PRODUCT_REPRESENT,
  productImage: PRODUCT_IMAGE,
  productGallery: PRODUCT_GALLERY,
  //post
  posts: POST_POSTS,
}

export default routes
