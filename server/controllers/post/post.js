import Post from "../../models/Post"
import Counter from "../../models/Counter"
import bcrypt from "bcrypt"
import "@babel/polyfill"

export const createPost = async (req, res) => {
  const { body } = req
  try {
    const post = new Post(body)
    //counter는 게시판 목록 번호를 나타냄
    //counter를 따로 db에 포함
    let counter = await Counter.findOne({ category: "post" })
    if (!counter) {
      counter = new Counter({ category: "post", number: 1 })
      await counter.save()
      post.number = counter.number
      await post.save()
    } else {
      counter.number++
      post.number = counter.number
      await counter.save()
      await post.save()
    }
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
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { views: 1 } },
      { new: true }
    )
    return res.status(200).json({ success: true, post })
  } catch (error) {
    return res.status(404).json({ success: false })
  }
}

export const getPosts = async (req, res) => {
  let {
    query: { skip, limit },
  } = req
  skip = parseInt(skip, 10)
  limit = parseInt(limit, 10)
  try {
    const [posts, postsLength] = await Promise.all([
      Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Post.estimatedDocumentCount(), // 포스트 갯수 구하기
    ])
    return res.status(200).json({ success: true, posts, postsLength })
  } catch (error) {
    return res.status(404).json({ success: false })
  }
}

//아직 사용하지는 않고 있음
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
        .json({ success: true, message: "해당 게시글을 삭제하였습니다." })
    }
  } catch (error) {
    if (error.message === "Cannot read property 'password' of null")
      return res.status(400).json({ success: false, error })
    return res.status(404).json({ success: false, error })
  }
}
