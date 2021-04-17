import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 70,
        required: true
    },
    region: String,
    location: {
        type: String,
        required: true
    },
    description: String,
    images: {
        type: Array,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const Product = mongoose.model("Product", ProductSchema)

export default Product