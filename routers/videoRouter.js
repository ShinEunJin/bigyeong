import express from "express"
import { getUpload } from "../controllers/videoController"
import routes from "../routes"

const videoRouter = express.Router()

videoRouter.get(routes.upload, getUpload)

export default videoRouter