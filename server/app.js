import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import routes from "./routes"
import cors from "cors"
import helmet from "helmet"
import hpp from "hpp"
import path from "path"
import {
  auth,
  login,
  logout,
  register,
  uploadAvatars,
  updateProfile,
  registerCheck,
  updateUserLike,
  getUserTake,
  updateUserTake,
  getUserProfile,
  getUserProducts,
  deleteUser,
} from "./controllers/userController"
import { registerEmail } from "./controllers/userControllers/base/sendEmail"
import middleAuth from "./middlewares/middleAuth"
import {
  deployProduct,
  detailProduct,
  findDetailProduct,
  getComments,
  getProduct,
  getProducts,
  likeProduct,
  removeComment,
  uploadImages,
  uploadProduct,
  writeComment,
  deleteProduct,
  updateProduct,
} from "./controllers/productController"
import { uploadAvatarImage, uploadProductImage } from "./middlewares/multer"

const app = express()

const prod = process.env.NODE_ENV === "production"

app.use(helmet())
app.use(hpp())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/logo", express.static("logo"))
app.use("/uploads", express.static("uploads"))

//User
app.post(routes.register, register)
app.get(routes.register, registerCheck)
app.post(routes.registerEmail, registerEmail)
app.post(routes.login, login)
app.get(routes.auth, middleAuth, auth)
app.get(routes.logout, middleAuth, logout)

app.get(routes.getUserProducts, middleAuth, getUserProducts)

app.post(routes.avatar, uploadAvatarImage, uploadAvatars)
app.patch(routes.profile, middleAuth, updateProfile)
app.get(routes.profile, getUserProfile)

app.patch(routes.userLike, updateUserLike)

app.get(routes.userTake, getUserTake)
app.patch(routes.userTake, updateUserTake)

app.delete(routes.userDelete, deleteUser)

//Product
app.get(routes.products, getProducts)

app.get(routes.product, getProduct)
app.patch(routes.product, updateProduct)
app.delete(routes.product, deleteProduct)

app.post(routes.product, uploadProduct)
app.get(routes.productAll, deployProduct)
app.get(routes.productDetail, detailProduct)
app.post(routes.productImage, uploadProductImage, uploadImages)

app.patch(routes.productLike, middleAuth, likeProduct)

app.post(routes.productComments, middleAuth, writeComment)
app.get(routes.productComments, getComments)
app.delete(routes.productComments, removeComment)

app.get(routes.productFindDetail, findDetailProduct)

if (prod) {
  app.use(express.static(path.join(__dirname, "../client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
}

export default app
