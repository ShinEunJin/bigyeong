import mongoose from "mongoose"
import bcrypt from "bcrypt"
import moment from "moment"

const CommentSchema = new mongoose.Schema(
  {
    noWriter: Boolean,
    password: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    likes: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: moment().format("YYYY년 MM월 DD일"),
    },
    text: String,
  },
  { timestamps: true }
)

CommentSchema.pre("save", function (next) {
  const saltRounds = 10
  const comment = this
  if (Comment.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(comment.password, salt, function (err, hash) {
        if (err) return next(err)
        comment.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment
