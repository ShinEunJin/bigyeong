import express from "express"
import {
  register,
  registerCheck,
  registerEmail,
} from "../controllers/user/register"
import { login } from "../controllers/user/login"
import middleAuth from "../middlewares/middleAuth"
import routes from "../routes"
import { getUserTake, updateUserTake } from "../controllers/user/userController"

const userRouter = express.Router()

//register
userRouter.post(routes.userRegister, register)
userRouter.get(routes.userRegister, registerCheck)
userRouter.post(routes.userAuthEmail, registerEmail)

userRouter.get(routes.userLogin, login)
userRouter.get(routes.userAuth, middleAuth, auth)
userRouter.get(routes.logout, middleAuth, logout)

userRouter.get(routes.userTake, getUserTake)
userRouter.patch(routes.userTake, updateUserTake)

export default userRouter
