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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    res.status(201).json({
      token,
      userId: user.id,
    });

  } catch (error: any) {
    console.log(error.message);

    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});
