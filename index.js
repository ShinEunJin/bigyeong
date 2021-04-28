import app from "./app"
import "./db"
import dotenv from "dotenv"
dotenv.config()

app.listen(process.env.PORT, () => { console.log(`✅ Listening on: http://localhost:${process.env.PORT}`) })