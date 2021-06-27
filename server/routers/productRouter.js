import express from "express"
import {
  deleteProduct,
  getProduct,
  getRepProduct,
  updateProduct,
  uploadProduct,
} from "../controllers/product/product"
import {
  getProductsBySearch,
  getProductsByMap,
} from "../controllers/product/products"
import { uploadImages, getGallery } from "../controllers/product/image"
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
productRouter.post(routes.productImage, uploadProductImage, uploadImages)
productRouter.get(routes.repProduct, getRepProduct)
/* productRouter.patch(routes.productLike, middleAuth, likeProduct) */

export default productRouter
