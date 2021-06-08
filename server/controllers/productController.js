import Product from "../models/Product"
import User from "../models/User"
import Comment from "../models/Comment"
import "@babel/polyfill"

import dotenv from "dotenv"
dotenv.config()

export const getProducts = async (req, res) => {
  const {
    query: { sortBy, skip, limit, region, searchTerm },
  } = req
  let skipToNum = parseInt(skip, 10)
  let limitToNum = parseInt(limit, 10)
  /* console.log({ sortBy: sortBy, region: region, searchTerm: searchTerm })
  console.log(typeof sortBy, typeof region, typeof searchTerm) */
  try {
    if (searchTerm !== "") {
      const products = await Product.find(
        region === ""
          ? {
              name: { $regex: searchTerm, $options: "i" },
            }
          : {
              region1: { $in: region.split(",") },
              name: { $regex: searchTerm, $options: "i" },
            }
      )
        .sort(
          sortBy === "popular"
            ? { views: -1 }
            : sortBy === "like"
            ? { likes: -1 }
            : sortBy === "new"
            ? { createdAt: -1 }
            : { views: -1 }
        )
        .skip(skipToNum)
        .limit(limitToNum)
      return res.status(200).json({ success: true, products })
    } else {
      const products = await Product.find(
        region === ""
          ? {}
          : {
              region1: { $in: region.split(",") },
            }
      )
        .sort(
          sortBy === "popular"
            ? { views: -1 }
            : sortBy === "like"
            ? { likes: -1 }
            : sortBy === "new"
            ? { createdAt: -1 }
            : { views: -1 }
        )
        .skip(skipToNum)
        .limit(limitToNum)
      return res.status(200).json({ success: true, products })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

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
  const {
    query: { id },
  } = req
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("writer")
    return res.status(200).json({ success: true, product })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const deployProduct = async (req, res) => {
  let {
    query: { filter, limit, skip },
  } = req

  skip = parseInt(skip) || 0
  limit = parseInt(limit) || 10

  try {
    const productLen = (await Product.find({ region1: filter })).length
    const product = await Product.find({ region1: filter })
      .skip(skip)
      .limit(limit)
    return res.status(200).json({ success: true, product, productLen })
  } catch (error) {
    return res.status(400).json({ success: false, error })
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
    body: { productId, alreadyLike },
  } = req
  try {
    if (!alreadyLike) {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { $inc: { likes: 1 } },
        { new: true }
      )
      return res.status(200).json({ success: true, likeNum: product.likes })
    } else {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { $inc: { likes: -1 } },
        { new: true }
      )
      return res.status(200).json({ success: true, likeNum: product.likes })
    }
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
