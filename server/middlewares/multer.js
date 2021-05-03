import multer from "multer"

const multerProductImage = multer({ dest: "uploads/images/" })
const multerAvatar = multer({ dest: "uploads/avatars/" })

export const uploadProductImage = multerProductImage.single("imageFile")
export const uploadAvatarImage = multerAvatar.single("avatarFile")
