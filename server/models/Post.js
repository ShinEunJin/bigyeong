import mongoose from "mongoose"
import bcrypt from "bcrypt"
import moment from "moment"

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

PostSchema.pre("save", function (next) {
  const saltRounds = 10
  const post = this
  if (post.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(post.password, salt, function (err, hash) {
        if (err) return next(err)
        post.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

const Post = mongoose.model("Post", PostSchema)

export default Post
