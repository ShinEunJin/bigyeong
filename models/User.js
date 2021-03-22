import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: String
})

const User = mongoose.model("User", UserSchema)

export default User