import express from "express"
import {
  getComments,
  removeComment,
  writeComment,
} from "../controllers/comment/commentController"

const commentRouter = express.Router()

commentRouter.get("/", getComments)
commentRouter.post("/", writeComment)
commentRouter.delete("/", removeComment)

export default commentRouter
