import express from "express"
import { register } from "../controllers/user/userController"

const userRouter = express.Router()

userRouter.post(routes.register, register)
userRouter.get(routes.register, registerCheck)
userRouter.post(routes.authEmail, registerEmail)

export default userRouter
