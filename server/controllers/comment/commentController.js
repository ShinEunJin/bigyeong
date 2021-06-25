import Product from "../models/Product"
import User from "../models/User"
import Comment from "../models/Comment"
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
        .populate("writer", "-password -token")
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
    body: { text, productId },
    user: writer,
  } = req
  try {
    const comment = new Comment({
      text,
      writer,
      product: productId,
    })
    await comment.save()
    await Promise.all([
      Product.findOneAndUpdate(
        { _id: productId },
        {
          $push: {
            comments: comment,
          },
        },
        { new: true }
      ),
      User.findOneAndUpdate(
        { _id: writer._id },
        {
          $push: {
            comments: comment,
          },
        },
        { new: true }
      ),
    ])
    return res.status(200).json({ success: true, comment })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const removeComment = async (req, res) => {
  const {
    query: { commentId, productId, userId },
  } = req
  try {
    await Promise.all([
      Product.findOneAndUpdate(
        { _id: productId },
        {
          $pull: { comments: commentId },
        },
        { new: true }
      ),
      User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { comments: commentId },
        },
        { new: true }
      ),
      Comment.findOneAndDelete({ _id: commentId }),
    ])
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
