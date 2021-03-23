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
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.json({ success: false, error })
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
        await user.save()
        res.cookie("x_auth", user.token).status(200).json({ success: true, userId: user._id })
    } catch (error) {
        return res.json({ success: false, error })
    }
}

export const auth = (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        isAdmin: req.user.role === 0 ? false : true,
        email: req.user.email,
        role: req.user.role,
        image: req.user.image
    })
}

export const logout = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.json({ success: false, error })
    }
}