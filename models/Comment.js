import mongoose from "mongoose"
import moment from "moment"

const CommentSchema = new mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  writer_name: String,
  writer_avatar: String,
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
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  text: String,
})

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment
