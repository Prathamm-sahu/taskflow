import { Response, Request, Router } from "express";
import db from "../lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/user/signup", async (req: Request, res: Response) => {
  try {
    const userDetails = req.body;

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    const user = await db.user.create({
      data: {
        name: userDetails.name,
        email: userDetails.email,
        password: hashedPassword,
      },
    });

    // As soon as the user is created. Create three columns
    const column1 = await db.column.create({
      data: 
        {
          title: "To Do",
          authorId: user.id,
        }
    });

    const column2 = await db.column.create({
      data: 
        {
          title: "In Progress",
          authorId: user.id,
        },
      
    })

    const column3 = await db.column.create({
      data: {
        title: "Done",
        authorId: user.id,
      }
    })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    res.status(201).json({
      token,
      userId: user.id,
      column1Id: column1.id,
      column2Id: column2.id,
      column3Id: column3.id
    });
  } catch (error: any) {
    console.log(error.message);

    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});

router.post("/user/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExist = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) {
      res.status(404).json("User not found");
      return;
    }

    const isPasswordValid = bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      res.status(403).json({
        msg: "wrong Credentials",
      });
      return;
    }

    const token = jwt.sign(
      { id: userExist.id },
      process.env.JWT_SECRET as string
    );
    res.json({
      token,
      userId: userExist.id,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});

export { router as authRouter };
