import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import routes from "./routes"
import { auth, login, logout, register } from "./controllers/userController"
import middleAuth from "./middlewares/middleAuth"


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.post(routes.register, register)
app.post(routes.login, login)
app.get(routes.auth, middleAuth, auth)
app.get(routes.logout, middleAuth, logout)

export default app