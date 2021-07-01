import Product from "../../models/Product"
import Comment from "../../models/Comment"
import bcrypt from "bcrypt"
import "@babel/polyfill"

export const getComments = async (req, res) => {
  const {
    query: { productId, skip, limit },
  } = req
  let skipToNum = parseInt(skip, 10)
  let limitToNum = parseInt(limit, 10)
  try {
    const [comments, commentsLength] = await Promise.all([
      Comment.find({ product: productId })
        .sort({ createdAt: -1 })
        .skip(skipToNum)
        .limit(limitToNum),
      Comment.find({ product: productId }),
    ])
    return res
      .status(200)
      .json({ success: true, comments, length: commentsLength.length })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const writeComment = async (req, res) => {
  const {
    body: { text, productId, name, password },
  } = req
  try {
    const comment = new Comment({
      text,
      name,
      password,
      product: productId,
    })
    await comment.save()
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        $push: {
          comments: comment,
        },
      },
      { new: true }
    )
    return res.status(200).json({ success: true, comment })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const removeComment = async (req, res) => {
  const {
    query: { commentId, productId, password },
  } = req
  try {
    const comment = await Comment.findOne({ _id: commentId })
    const match = await bcrypt.compare(password, comment.password)
    if (!match)
      return res.json({ success: false, message: "비밀번호가 맞지 않습니다." })
    else {
      await Promise.all([
        Product.findOneAndUpdate(
          { _id: productId },
          {
            $pull: { comments: commentId },
          },
          { new: true }
        ),
        comment.remove(),
      ])
    }
    return res
      .status(200)
      .json({ success: true, message: "해당 댓글을 삭제하였습니다." })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
