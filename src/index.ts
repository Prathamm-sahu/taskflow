import express from "express"
import { authRouter } from "./router/auth"

const app = express()

app.get("/", (req, res) => {
  res.send("Server started")
})

app.use("/api/v1", authRouter)

app.listen(3000, () => console.log("Server started at port 3000"))