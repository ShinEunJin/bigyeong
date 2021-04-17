import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import routes from "./routes"
import { addLike, addTake, auth, login, logout, register, removeTake, uploadAvatar } from "./controllers/userController"
import middleAuth from "./middlewares/middleAuth"
import { deployProduct, detailProduct, likeProduct, takeProduct, uploadImages, uploadProduct } from "./controllers/productController"
import { uploadImage } from "./middlewares/multer"

const app = express()

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
app.post(routes.uploadAvatar, uploadImage, middleAuth, uploadAvatar)

//Product
app.post(routes.product, uploadProduct)
app.post(routes.productAll, deployProduct)
app.get(routes.productDetail, detailProduct)
app.post(routes.productImage, uploadImage, uploadImages)
app.post(routes.productLike, middleAuth, likeProduct)
app.get(routes.productTake, middleAuth, takeProduct)

export default app