import User from "../../models/User"
import bcrypt from "bcrypt"
import Product from "../../models/Product"
import "@babel/polyfill"

export const getUserTake = async (req, res) => {
  const {
    query: { productId },
  } = req
  let list = productId.split(",")
  try {
    const product = await Product.find({ _id: { $in: list } }).populate(
      "writer",
      "-password -token"
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
      Comment.deleteMany({ writer: userId }),
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
