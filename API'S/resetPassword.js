import express from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../Database connection/model.js";
import bcrypt from "bcrypt";

const resetPasswordRouter = express.Router();

resetPasswordRouter.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const data = jwt.verify(userData.token, process.env.JWT_SECRET);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await userModel.updateOne(
        { email: data.email },
        { $set: { password: hashedPassword } }
      );
   
    // Corrected log statement
    res.send({ msg: "Password reset Successfully", code: 1 });
  } catch (err) {
    console.log(err)
    res.status(403).send({ msg: "Reset unsuccessful", code: -1 });
  }
});

export default resetPasswordRouter;
