import app from "./app"
import "./db"
import dotenv from "dotenv"

dotenv.config()

/* greenlock
  .init({
    packageRoot: path.join(__dirname, "../"),
    configDir: path.join(__dirname, "../", "server/config/greenlock.d"),
    maintainerEmail: "sineun5501@naver.com",
    cluster: false,
  })
  .serve(app, () => {
    console.log("✅  greenlock work")
  }) */

app.listen(process.env.PORT, () => {
  console.log(`✅ Listening on: http://localhost:${process.env.PORT}`)
})
