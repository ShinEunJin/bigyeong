import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 70,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Product = mongoose.model("Product", ProductSchema)

export default Product