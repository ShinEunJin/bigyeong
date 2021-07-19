import mongoose from "mongoose"
import moment from "moment"

// 신고 DB
const ReportSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    date: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
    },
    number: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
)

const Report = mongoose.model("Report", ReportSchema)

export default Report
