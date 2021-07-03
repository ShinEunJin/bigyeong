import Post from "../../models/Post"
import bcrypt from "bcrypt"
import "@babel/polyfill"

export const createPost = async (req, res) => {
  const { body } = req
  try {
    const post = new Post(body)
    await post.save()
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
}

export const getPost = async (req, res) => {
  const {
    query: { postId },
  } = req
  try {
    const post = await Post.findOne({ _id: postId })
    return res.status(200).json({ success: true, post })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
}

export const getPosts = async (req, res) => {
  const {
    query: { skip, limit },
  } = req
  let skipToNum = parseInt(skip, 10)
  let limitToNum = parseInt(limit, 10)
  try {
    const [posts, postsLength] = await Promise.all([
      Post.find().sort({ createdAt: -1 }).skip(skipToNum).limit(limitToNum),
      Post.estimatedDocumentCount(),
    ])
    return res.status(200).json({ success: true, posts, postsLength })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
}

export const updatePost = async (req, res) => {
  const {
    body: { postId, title, text },
  } = req
  try {
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { text },
      { new: true }
    )
    return res.status(200).json({ success: true, post })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
}

export const deletePost = async (req, res) => {
  const {
    query: { postId, password },
  } = req
  try {
    const post = await Post.findOne({ _id: postId })
    const match = await bcrypt.compare(password, post.password)
    if (!match)
      return res.json({ success: false, message: "비밀번호가 맞지 않습니다." })
    else {
      await post.remove()
      return res
        .status(200)
        .json({ success: true, message: "해당 댓글을 삭제하였습니다." })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
