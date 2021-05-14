import Product from "../models/Product"
import User from "../models/User"
import Comment from "../models/Comment"
import "@babel/polyfill"

import dotenv from "dotenv"
dotenv.config()

export const uploadImages = (req, res) => {
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

export const uploadProduct = async (req, res) => {
  const { body } = req
  try {
    const product = new Product(body)
    await product.save()
    await User.findOneAndUpdate(
      { _id: body.writer },
      {
        $push: {
          products: product,
        },
      },
      { new: true }
    )
    return res.status(200).json({ success: true, product })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const getProduct = async (req, res) => {
  let {
    query: { filters },
  } = req
  try {
    const product = await Product.find({ region: filters })
    return res.status(200).json({ success: true, product })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const deployProduct = async (req, res) => {
  let {
    body: { skip, limit, filters, searchTerm },
  } = req
  let findArgs = {}

  skip = parseInt(skip) || 0
  limit = parseInt(limit) || 8

  for (let key in filters) {
    if (filters[key].length > 0) {
      findArgs[key] = filters[key]
    }
  }

  if (searchTerm) {
    try {
      const productInfo = await Product.find(findArgs)
        .find({ name: { $regex: searchTerm, $options: "i" } })
        .populate("writer")
        .skip(skip)
        .limit(limit)
      return res
        .status(200)
        .json({ success: true, productInfo, productLen: productInfo.length })
    } catch (error) {
      return res.status(400).json({ success: false, error })
    }
  } else {
    try {
      const productInfo = await Product.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
      return res
        .status(200)
        .json({ success: true, productInfo, productLen: productInfo.length })
    } catch (error) {
      return res.status(400).json({ success: false, error })
    }
  }
}

export const detailProduct = async (req, res) => {
  const {
    query: { id },
  } = req
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        $inc: { views: 1 },
      },
      { new: true }
    ).populate("writer")
    return res.status(200).json({ success: true, product })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const likeProduct = async (req, res) => {
  const {
    body: { productId, userId },
  } = req
  try {
    const user = await User.findOne({ _id: userId })
    let myProduct = false
    user.products.forEach((item) => {
      if (item.id.toString() === productId) {
        myProduct = true
      }
    })
    if (myProduct) {
      return res.json({ myProduct })
    } else {
      let alreadyLike = false
      user.likes.forEach((item) => {
        if (item.id === productId) {
          alreadyLike = true
        }
      })
      if (alreadyLike) {
        const product = await Product.findOneAndUpdate(
          { _id: productId },
          {
            $inc: { likes: -1 },
          },
          { new: true }
        )
        return res.status(200).json({ success: true, likes: product.likes })
      } else {
        const product = await Product.findOneAndUpdate(
          { _id: productId },
          {
            $inc: { likes: 1 },
          },
          { new: true }
        )
        return res.status(200).json({ success: true, likes: product.likes })
      }
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const takeProduct = async (req, res) => {
  const {
    query: { id },
  } = req
  let takeList = id.split(",")
  try {
    const product = await Product.find({ _id: { $in: takeList } }).populate(
      "writer"
    )
    return res.status(200).json({ success: true, product })
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
      writer_name: writer.name,
      writer_avatar: writer.avatar,
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
    await User.findOneAndUpdate(
      { _id: writer._id },
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

export const getComments = async (req, res) => {
  const {
    query: { id },
  } = req
  try {
    const comments = await Comment.find({ product: id })
    return res.status(200).json({ success: true, comments })
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

export const removeProduct = async (req, res) => {
  const {
    query: { productId, userId },
  } = req
  try {
    await Promise.all([
      User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { products: productId },
        },
        { new: true }
      ),
      Comment.remove({ product: productId }),
      Product.findOneAndDelete({ _id: productId }),
    ])
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const findDetailProduct = async (req, res) => {
  const {
    query: { productId },
  } = req
  try {
    const product = await Product.findOne({ _id: productId })
    return res.status(200).json({ success: true, product })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
