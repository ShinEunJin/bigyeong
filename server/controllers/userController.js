import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Product from "../models/Product"
import "@babel/polyfill"
import dotenv from "dotenv"

dotenv.config()

export const register = async (req, res) => {
  const {
    body: { name, email, password },
  } = req
  try {
    const user = new User({ name, email, password })
    await user.save()
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const registerCheck = async (req, res) => {
  const {
    query: { email },
  } = req
  let isExisted = false
  try {
    const user = await User.findOne({ email })
    if (user) {
      isExisted = true
      return res.status(200).json({ success: true, isExisted })
    } else {
      return res.status(200).json({ success: true, isExisted })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const login = async (req, res) => {
  const {
    body: { email, password },
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
    const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET)
    user.token = token
    await user.save()
    res
      .cookie("x_auth", user.token)
      .status(200)
      .json({ success: true, userId: user._id })
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
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    take: req.user.take,
    likes: req.user.likes,
    avatar: req.user.avatar,
    products: req.user.products,
  })
}

export const logout = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "", isAuth: false }
    )
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.json({ success: false, error })
  }
}

export const getMyProduct = async (req, res) => {
  const {
    user: { _id },
  } = req
  try {
    const user = await User.findOne({ _id })
    let productList = user.products.map((item) => {
      return item.id
    })
    const product = await Product.find({ _id: { $in: productList } })
    return res.status(200).json({ success: true, product })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const uploadAvatars = (req, res) => {
  const { file } = req
  try {
    return res.json({
      success: true,
      filePath:
        process.env.NODE_ENV === "production" ? file.location : file.path,
    })
  } catch (error) {
    return res.json({ success: false, error })
  }
}

export const updateProfile = async (req, res) => {
  const {
    user: { _id },
    body: { avatar },
  } = req
  try {
    const user = await User.findOneAndUpdate({ _id }, { avatar })
    await user.save()
    return res.status(200).json({ success: true, user })
  } catch (error) {
    return res.json({ success: false, error })
  }
}

export const updateUserLike = async (req, res) => {
  const {
    body: { userId, productId, alreadyLike },
  } = req
  try {
    if (!alreadyLike) {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            likes: productId,
          },
        },
        { new: true }
      )
      return res.status(200).json({ success: true, like: user.likes })
    } else {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            likes: productId,
          },
        },
        { new: true }
      )
      return res.status(200).json({ success: true, like: user.likes })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const getUserTake = async (req, res) => {
  const {
    query: { productId },
  } = req
  let list = productId.split(",")
  try {
    const product = await Product.find({ _id: { $in: list } }).populate(
      "writer"
    )
    return res.status(200).json({ success: true, product })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const updateUserTake = async (req, res) => {
  const {
    body: { userId, productId, add },
  } = req
  try {
    if (add) {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            take: productId,
          },
        },
        { new: true }
      )
      return res.status(200).json({ success: true, take: user.take })
    } else {
      try {
        const user = await User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              take: productId,
            },
          },
          { new: true }
        )
        return res.status(200).json({ success: true, take: user.take })
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
