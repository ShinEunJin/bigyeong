import express from "express"
import bodyParser from "body-parser"
import routes from "./routes"
import { register } from "./controllers/userController"

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post(routes.register, register)

export default app