import Product from "../../models/Product"
import User from "../../models/User"
import Comment from "../../models/Comment"
import "@babel/polyfill"

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
    ).populate("writer", "-password -token")
    return res.status(200).json({ success: true, product })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

/* export const likeProduct = async (req, res) => {
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
} */

export const deleteProduct = async (req, res) => {
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
      Comment.deleteMany({ product: productId }),
      Product.findOneAndDelete({ _id: productId }),
    ])
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const updateProduct = async (req, res) => {
  const {
    body: {
      updateInfo: {
        images,
        name,
        region1,
        region2,
        address,
        location,
        description,
        coord,
      },
      productId,
    },
  } = req
  try {
    await Product.updateOne(
      { _id: productId },
      { images, name, region1, region2, address, location, description, coord },
      { new: true }
    )
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const getRepProduct = async (req, res) => {
  let random = parseInt(Math.random() * 11)
  try {
    const product = await Product.find()
    return res.status(200).json({ success: true, repProduct: product[random] })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
