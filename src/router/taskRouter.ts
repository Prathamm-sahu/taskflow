import { Router, Request, Response } from "express"
import { authMiddleware } from "../middleware/auth"
import db from "../lib/db"

const router = Router()

router.get("/columnData", authMiddleware, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId
    
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

router.post("/add", authMiddleware, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId
    const { id, title, description, columnId } = req.body
    const newTask = await db.task.create({
      data: {
        id,
        title,
        description,
        authorId: userId,
        columnId
      }
    })

    res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
  }
})

router.put("/update", authMiddleware, async(req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId
    const { taskId, title, description } = req.body
    console.log(req.body)
    await db.task.update({
      where: {
        id: taskId,
        authorId: userId
      },
      data: {
        title,
        description,
      }
    })

    res.status(200).json("Update successful")
  } catch (error) {
    console.log(error)
  }
})

router.delete("/delete/:taskId", authMiddleware, async(req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId
    await db.task.delete({
      where: {
        id: req.params.taskId,
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
    // @ts-ignore
    const userId = req.userId
    const { title } = req.body
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

router.patch("/changeColumn", authMiddleware, async (req: Request, res: Response) => {
  try {
    // @ts-ignore 
    const userId = req.userId
    const { columnId, taskId } = req.body

    await db.task.update({
      where: {
        id: taskId,
        authorId: userId
      },
      data: {
        columnId
      }
    })

    res.json("Task moved")
  } catch (error) {
    console.log(error)
  }
})

router.post("/addComment", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { commentId, text, authorId, taskId  } = req.body
    await db.comment.create({
      data: {
        id: commentId,
        authorId: authorId,
        text,
        taskId
      }
    })

    res.json("Task has been successfully created")
  } catch (error) {
    console.log(error)
  }
})

export { router as taskRouter }