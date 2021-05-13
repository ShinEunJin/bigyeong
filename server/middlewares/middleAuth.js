import jwt from "jsonwebtoken"
import User from "../models/User"
import dotenv from "dotenv"
dotenv.config()

export default async (req, res, next) => {
  const token = req.cookies.x_auth
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded, token })
    if (!user) {
      return res.json({ isAuth: false, error: true })
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    return res.json({ success: false, error })
  }
}
