import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    writer_name: String,
    writer_avatar: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    text: String
})

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment