import express from "express"
import {
  deleteProduct,
  getGallery,
  getProduct,
  getRepProduct,
  updateProduct,
  uploadImages,
  uploadProduct,
} from "../../controllers/productController"
import middleAuth from "../middlewares/middleAuth"
import { uploadProductImage } from "../middlewares/multer"
import routes from "../routes"

const productRouter = express.Router()

productRouter.get(routes.home, getProduct)
productRouter.post(routes.home, uploadProduct)
productRouter.patch(routes.home, updateProduct)
productRouter.delete(routes.home, deleteProduct)
productRouter.get(routes.search, getProductsBySearch)
productRouter.get(routes.map, getProductsByMap)
productRouter.get(routes.image, getGallery)
productRouter.post(routes.image, uploadProductImage, uploadImages)
productRouter.get(routes.represent, getRepProduct)
productRouter.patch(routes.like, middleAuth, likeProduct)

export default productRouter
