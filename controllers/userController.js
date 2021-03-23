import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const {
        body: { name, email, password }
    } = req
    try {
        const user = new User({ name, email, password })
        await user.save()
        res.status(200).json({ success: true })
    } catch (error) {
        res.json({ success: false, error })
    }
}

export const login = async (req, res) => {
    const {
        body: { email, password }
    } = req
    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ success: false, message: "해당하는 이메일이 없습니다." })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.json({ success: false, message: "비밀번호가 맞지 않습니다." })
    }
    try {
        const token = jwt.sign(user._id.toHexString(), "secret")
        user.token = token
        user.save()
        res.cookie("x_auth", user.token).status(200).json({ success: true, userId: user._id })
    } catch (error) {
        return res.json({ success: false, error })
    }
}