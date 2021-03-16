import express from "express"
import { localsMiddleware } from "./middlewares"
import globalRouter from "./routers/globalRouter"
import videoRouter from "./routers/videoRouter"
import routes from "./routes"

const app = express()

app.set("view engine", "pug")

app.use(localsMiddleware)

app.use(routes.home, globalRouter)
app.use(routes.video, videoRouter)

export default app