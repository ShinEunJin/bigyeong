import express from "express"
import {
  register,
  registerCheck,
  registerEmail,
} from "../controllers/user/register"
import { login, auth, logout } from "../controllers/user/login"
import { getUserTake, updateUserTake } from "../controllers/user/take"
import middleAuth from "../middlewares/middleAuth"
import routes from "../routes"

const userRouter = express.Router()

//register
userRouter.post(routes.userRegister, register)
userRouter.get(routes.userRegister, registerCheck)
userRouter.post(routes.userAuthEmail, registerEmail)

userRouter.post(routes.userLogin, login)
userRouter.get(routes.userAuth, middleAuth, auth)
userRouter.get(routes.userLogout, middleAuth, logout)

userRouter.get(routes.userTake, getUserTake)
userRouter.patch(routes.userTake, updateUserTake)

export default userRouter
