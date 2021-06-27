import Product from "../../models/Product"
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

export const getGallery = async (req, res) => {
  const {
    query: { productId },
  } = req
  try {
    let gallery = []
    const product = await Product.findOne({ _id: productId })
    if (process.env.NODE_ENV === "development") {
      for (let image of product.images) {
        const object = {
          original: `http://localhost:5000/${image}`,
          thumbnail: `http://localhost:5000/${image}`,
        }
        gallery.push(object)
      }
    } else {
      for (let image of product.images) {
        const object = {
          original: `${image}`,
          thumbnail: `${image}`,
        }
        gallery.push(object)
      }
    }
    return res.status(200).json({ success: true, gallery })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
