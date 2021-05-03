import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"
import dotenv from "dotenv"
dotenv.config()

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
})

const multerProductImage = multer({
  storage: multerS3({
    s3,
    bucket: "eunjintour/product_image",
    region: "ap-northeast-2",
  }),
})
const multerAvatar = multer({
  storage: multerS3({
    s3,
    bucket: "eunjintour/avatar_image",
    region: "ap-northeast-2",
  }),
})

export const uploadProductImage = multerProductImage.single("imageFile")
export const uploadAvatarImage = multerAvatar.single("avatarFile")
