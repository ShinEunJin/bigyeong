import multer from "multer"

const multerImage = multer({ dest: "uploads/images/" })

export const uploadImage = multerImage.single("imageFile")
