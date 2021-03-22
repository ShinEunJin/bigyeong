import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGO_DEV_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
}).then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.log(`❌ ${err}`))