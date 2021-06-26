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

//product
productRouter.get("/", getProduct)
productRouter.post("/", uploadProduct)
productRouter.patch("/", updateProduct)
productRouter.delete("/", deleteProduct)

//products
productRouter.get(routes.findBySearch, getProductsBySearch)
productRouter.get(routes.findByMap, getProductsByMap)

//product gallery
productRouter.get(routes.productGallery, getGallery)

//
productRouter.post(routes.image, uploadProductImage, uploadImages)
productRouter.get(routes.repProduct, getRepProduct)
productRouter.patch(routes.productLike, middleAuth, likeProduct)

export default productRouter
