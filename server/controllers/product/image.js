import Product from "../../models/Product"
import dotenv from "dotenv"

dotenv.config()

//사진 컨텐츠 업로드 시에 사용
export const uploadImages = (req, res) => {
  const { file } = req
  try {
    return res.json({
      success: true,
      filePath:
        process.env.NODE_ENV === "production" ? file.location : file.path, //multer이 배포 및 개발 환경에서 file 경로가 다름
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
    //react에서 image-gallery 라이브러리 사용시 쓰이는 객체에 사용하기 위한 부분
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
