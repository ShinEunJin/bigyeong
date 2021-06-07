import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import routes from "./routes"
import cors from "cors"
import path from "path"
import {
  auth,
  getMyProduct,
  login,
  logout,
  register,
  uploadAvatars,
  updateProfile,
  registerCheck,
  updateUserLike,
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
  removeProduct,
  takeProduct,
  uploadImages,
  uploadProduct,
  writeComment,
} from "./controllers/productController"
import { uploadAvatarImage, uploadProductImage } from "./middlewares/multer"

const app = express()

const prod = process.env.NODE_ENV === "production"

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
app.get(routes.getMyProducts, middleAuth, getMyProduct)
app.post(routes.uploadAvatar, uploadAvatarImage, uploadAvatars)
app.post(routes.updateProfile, middleAuth, updateProfile)

app.patch(routes.userLike, updateUserLike)

//Product
app.get(routes.products, getProducts)
app.get(routes.product, getProduct)

app.post(routes.product, uploadProduct)
app.get(routes.productAll, deployProduct)
app.get(routes.productDetail, detailProduct)
app.post(routes.productImage, uploadProductImage, uploadImages)
app.post(routes.productLike, middleAuth, likeProduct)
app.get(routes.productTake, middleAuth, takeProduct)
app.post(routes.productComment, middleAuth, writeComment)
app.get(routes.productGetComment, getComments)
app.delete(routes.productRemoveComment, removeComment)
app.delete(routes.productRemove, removeProduct)
app.get(routes.productFindDetail, findDetailProduct)

if (prod) {
  app.use(express.static(path.join(__dirname, "../client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
}

export default app
