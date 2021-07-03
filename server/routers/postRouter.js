import express from "express"
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/post/post"
import routes from "../routes"

const postRouter = express.Router()

postRouter.get("/", getPost)
postRouter.post("/", createPost)
postRouter.patch("/", updatePost)
postRouter.delete("/", deletePost)

postRouter.get(routes.posts, getPosts)

export default postRouter
