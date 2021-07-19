import express from "express"
import cookieParser from "cookie-parser"
import routes from "./routes"
import cors from "cors"
import hpp from "hpp"
import path from "path"
import productRouter from "./routers/productRouter"
import commentRouter from "./routers/commentRouter"
import userRouter from "./routers/userRouter"
import postRouter from "./routers/postRouter"
import { report } from "./controllers/report/report"

const app = express()

const prod = process.env.NODE_ENV === "production"

app.use(hpp())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use("/logo", express.static("logo"))
app.use("/uploads", express.static("uploads"))

//routers에서 미들웨어로 사용
app.use(routes.apiProduct, productRouter)
app.use(routes.apiUser, userRouter)
app.use(routes.apiComment, commentRouter)
app.use(routes.apiPost, postRouter)
app.post(routes.apiReport, report) // 따로 라우터를 안넣고 바로 컨트롤러 사용

if (prod) {
  app.use(express.static(path.join(__dirname, "../client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
}

export default app
