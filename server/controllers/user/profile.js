import User from "../../models/User"
import Product from "../../models/Product"
import bcrypt from "bcrypt"
import "@babel/polyfill"

export const updateProfile = async (req, res) => {
  const {
    user: { _id },
    body: { avatar, name, email },
  } = req
  try {
    const user = await User.findOneAndUpdate({ _id }, { avatar, name, email })
    await user.save()
    return res.status(200).json({ success: true, user })
  } catch (error) {
    return res.json({ success: false, error })
  }
}

export const deleteUser = async (req, res) => {
  const {
    query: { userId, password },
  } = req
  const user = await User.findOne({ _id: userId })
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.json({ success: false, message: "비밀번호가 맞지 않습니다." })
  }
  try {
    await Promise.all([
      Product.deleteMany({ writer: userId }),
      User.findOneAndDelete({ _id: userId }),
    ])
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.json({
      success: false,
      message: "회원 탈퇴 과정에 오류가 발생하였습니다.",
    })
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

//getMyProfile이지만 사진들만 불러옴, 이름 같은건 이미 미들웨어로 전달
export const getMyProfile = async (req, res) => {
  let {
    query: { userId, skip, limit },
  } = req
  skip = parseInt(skip, 10)
  limit = parseInt(limit, 10)
  try {
    const products = await Product.find({ writer: userId })
      .skip(skip)
      .limit(limit)
    return res.status(200).json({ success: true, products })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
