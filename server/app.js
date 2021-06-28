import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import routes from "./routes"
import cors from "cors"
import hpp from "hpp"
import path from "path"
import productRouter from "./routers/productRouter"
import commentRouter from "./routers/commentRouter"
import userRouter from "./routers/userRouter"

const app = express()

const prod = process.env.NODE_ENV === "production"

app.use(hpp())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/logo", express.static("logo"))
app.use("/uploads", express.static("uploads"))

//User
/* app.post(routes.register, register)
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

app.delete(routes.userDelete, deleteUser) */

//Product
/* app.patch(routes.productLike, middleAuth, likeProduct) */

app.use(routes.apiProduct, productRouter)
app.use(routes.apiUser, userRouter)
/* app.use(routes.apiComment, commentRouter) */

if (prod) {
  app.use(express.static(path.join(__dirname, "../client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
}

export default app
