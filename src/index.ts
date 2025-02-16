import express from "express"
import { authRouter } from "./router/auth"
import { taskRouter } from "./router/taskRouter"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Server started")
})

app.use("/api/v1", authRouter)
app.use("/api/v1/task", taskRouter)

app.listen(3000, () => console.log("Server started at port 3000"))