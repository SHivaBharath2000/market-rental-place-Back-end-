import express from 'express';
import { userModel } from '../Database connection/model.js';
import bcrypt from 'bcrypt';
import { db } from '../Database connection/mongo-connection.js';
import jwt from "jsonwebtoken";

const loginRouter=express.Router()

loginRouter.post("/", async (req, res) => {
    const userData = req.body; // email,password come
  
    const userObj = await userModel.findOne({ email: userData.email });
  
    if (userObj) {
      //Login to handle successful login
      //verify the password send success message only if the password correct.
      bcrypt.compare(
        userData.password,
        userObj.password,
        async function (err, result) {
          // result == true
          if (err) {
            res.status(500).send({ msg: "something went wrong" });
          } else {
            if (result) {
              const collection=db.collection("users")
              const user = await collection.findOne(
                { email: userData.email },
                {
                  projection: { password: 0, __v: 0, _id: 0 },
                }
                
              );
              var token = jwt.sign({...user}, process.env.JWT_SECRET,{expiresIn:"1day"});
              console.log(token)
              res.status(200).send({ msg: "Login successfully", code: 1, token });
              console.log(userObj);
            } else {
              res
                .status(400)
                .send({ msg: "Invalid email id and password", code: 0 });
            }
          }
        }
      );
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  });
  
  export default loginRouter;
  