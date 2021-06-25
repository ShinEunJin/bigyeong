import mongoose from "mongoose"
import moment from "moment"

const CommentSchema = new mongoose.Schema(
  {
    noWriter: Boolean,
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment
