import express from "express";
import bcrypt from "bcrypt"; 
import { userModel } from "../Database connection/model.js";
import { transporter,mailOptions } from "./mailUtils.js";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const userData = req.body;
  const userObj = await userModel.findOne({ email: userData.email });

  // Check if the user already exists
  if (userObj) {
    res.status(400).send({ msg: "User already exists" });
  } else {
    try {
      const id = Date.now().toString();
      bcrypt.hash(userData.password, 10, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "Please enter a proper password" });
        } else {
          const newUser = new userModel({
            ...userData,
            password: hash, // Store the hashed password
            id,
            isAdmin: false,
            createdAt: new Date().toISOString()
          });
          await newUser.save();
          await transporter.sendMail({
            ...mailOptions,
            to: userData.email, // "to" from mail options will be overriden
            subject: "Welcome to Rental equipment project!",
            text:  `To Continue, Please login your email address ${process.env.FE_URL}/login`,
          });
          res.send({ msg: "User saved successfully" ,code:1});
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Server error", err ,code:0});
    }
  }
});

export default registerRouter;
