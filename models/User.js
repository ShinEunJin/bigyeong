import mongoose from "mongoose"
import bcrypt from "bcrypt"

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
    token: String,
    take: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
})

UserSchema.pre("save", function (next) {
    const saltRounds = 10
    const user = this
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

const User = mongoose.model("User", UserSchema)

export default User