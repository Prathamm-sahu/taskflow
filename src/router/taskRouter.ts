import { Router, Request, Response } from "express"
import { authMiddleware } from "../middleware/auth"
import db from "../lib/db"

const router = Router()

router.get("/columnsData", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body
    
    const columnData = await db.column.findMany({
      where: {
        authorId: userId
      },
      select: {
        id: true,
        title: true,
        tasks: {
          include: {
            comments: true
          }
        }
      }
    })
    
    res.json(columnData)
  } catch (error) {
    console.log(error)
  }
})

router.post("/addTask", async (req, res) => {
  try {
    const { title, description, status, userId, columnId } = req.body

    const newTask = await db.task.create({
      data: {
        title,
        description,
        status,
        authorId: userId,
        columnId
      }
    })

    res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
  }
})

router.put("/updateColumn", authMiddleware, async(req: Request, res: Response) => {
  try {
    const { userId, taskId, title, description, status } = req.body
    await db.task.update({
      where: {
        id: taskId,
        authorId: userId
      },
      data: {
        title,
        description,
        status
      }
    })

    res.status(200).json("Update successful")
  } catch (error) {
    console.log(error)
  }
})

router.delete("/delete", authMiddleware, async(req: Request, res: Response) => {
  try {
    const { userId, taskId } = req.body
    await db.task.delete({
      where: {
        id: taskId,
        authorId: userId
      }
    })

    res.json("deleteion successfull")
  } catch (error) {
    console.log(error)
  }
})

router.post("/addColumn", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId, title } = req.body
    await db.column.create({
      data: {
        title,
        authorId: userId
      }
    })

    res.json("column created")
  } catch (error) {
    console.log(error)
  }
})

router.delete("/deleteColumn", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { columnId, userId } = req.body
    await db.column.delete({
      where: {
        id: columnId,
        authorId: userId
      }
    })

    res.json("Column Deleted successful")
  } catch (error) {
    console.log(error)
  }
})

export { router as taskRouter }