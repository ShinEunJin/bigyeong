import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import routes from "./routes"
import cors from "cors"
import { addLike, addTake, auth, getLike, getMyProduct, login, logout, register, removeTake, uploadAvatars, updateProfile } from "./controllers/userController"
import middleAuth from "./middlewares/middleAuth"
import { deployProduct, detailProduct, likeProduct, takeProduct, uploadImages, uploadProduct } from "./controllers/productController"
import { uploadAvatarImage, uploadProductImage } from "./middlewares/multer"

const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))


//User
app.post(routes.register, register)
app.post(routes.login, login)
app.get(routes.auth, middleAuth, auth)
app.get(routes.logout, middleAuth, logout)
app.post(routes.addTake, middleAuth, addTake)
app.post(routes.addLike, middleAuth, addLike)
app.post(routes.removeTake, middleAuth, removeTake)
app.get(routes.getLike, middleAuth, getLike)
app.get(routes.getMyProducts, middleAuth, getMyProduct)
app.post(routes.uploadAvatar, uploadAvatarImage, uploadAvatars)
app.post(routes.updateProfile, middleAuth, updateProfile)

//Product
app.post(routes.product, uploadProduct)
app.post(routes.productAll, deployProduct)
app.get(routes.productDetail, detailProduct)
app.post(routes.productImage, uploadProductImage, uploadImages)
app.post(routes.productLike, middleAuth, likeProduct)
app.get(routes.productTake, middleAuth, takeProduct)

export default app