import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const prod = process.env.NODE_ENV === "production"
const dev = process.env.NODE_ENV === "development"

//dev와 prod를 나누고 mongodb compass 활용
if (dev) {
  mongoose
    .connect(process.env.MONGO_DEV_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("✅ Connected to Development MongoDB"))
    .catch((err) => console.log(`❌ ${err}`))
}

if (prod) {
  mongoose
    .connect(process.env.MONGO_PROD_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log(`❌ ${err}`))
}
