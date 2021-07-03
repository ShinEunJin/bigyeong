import mongoose from "mongoose"
import bcrypt from "bcrypt"
import moment from "moment"

const CommentSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
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
    report: Boolean,
    date: {
      type: String,
      default: moment().format("YYYY년 MM월 DD일"),
    },
  },
  { timestamps: true }
)

CommentSchema.pre("save", function (next) {
  const saltRounds = 10
  const comment = this
  if (comment.isModified("password")) {
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
