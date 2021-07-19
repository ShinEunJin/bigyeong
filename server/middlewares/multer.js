import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"
import dotenv from "dotenv"
dotenv.config()

const prod = process.env.NODE_ENV === "production"
const dev = process.env.NODE_ENV === "development"

let mp
let ma

// 개발환경에서는 root폴더에 uploads에 저장
if (dev) {
  let multerProductImage = multer({ dest: "uploads/images/" })
  let multerAvatar = multer({ dest: "uploads/avatars/" })
  mp = multerProductImage
  ma = multerAvatar
}

// 운영환경에서는 AWS S3 사용
if (prod) {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
  })

  let multerProductImage = multer({
    storage: multerS3({
      s3,
      bucket: "eunjintour/product_image",
      region: "ap-northeast-2",
    }),
  })
  let multerAvatar = multer({
    storage: multerS3({
      s3,
      bucket: "eunjintour/avatar_image",
      region: "ap-northeast-2",
    }),
  })
  mp = multerProductImage
  ma = multerAvatar
}

export const uploadProductImage = mp.single("imageFile")
export const uploadAvatarImage = ma.single("avatarFile")
