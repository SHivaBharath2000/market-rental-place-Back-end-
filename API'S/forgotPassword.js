import express from 'express';
import jwt from "jsonwebtoken";
import { userModel } from '../Database connection/model.js';
import { mailOptions,transporter } from './mailUtils.js';

const forgotRouter = express.Router();

forgotRouter.post("/", async (req, res) => {
    const userData = req.body;
    const userObj = await userModel.findOne({ email: userData.email });
    if(userObj){
        var token = jwt.sign({name:userData.name,email:userData.email}, process.env.JWT_SECRET,{expiresIn:"15mins"});
        await transporter.sendMail({
            ...mailOptions,
            to: userData.email, // "to" from mail options will be overriden
            subject: "Reset password",
            text:  `To Continue, Please click this link ${process.env.FE_URL}/resetpassword?token=${token}`,
          });
          res.send({msg:"Link send successfully",code: 1})
    }
    else{
        res.status(400).send({msg:"User not found",code:0})
    }
})

export  default forgotRouter