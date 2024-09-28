import express from "express";
import { paymentsModel } from "../Database connection/model.js";

const paymentRouter = express.Router();

paymentRouter.post("/", async (req, res) => {
  const userData = req.body; 
  try {
    if (userData.userName && userData.userName.trim() === "Admin") {
     
      const userPayments = await paymentsModel.find();
      res.send({ msg: "Payments fetched successfully", userPayments });
    } else if (userData.userName) {
      const userPayments = await paymentsModel.find({ userName: userData.userName.trim() });
      
      if (userPayments.length > 0) {
        res.send({ msg: "Payments fetched successfully", userPayments });
      } else {
        res.status(404).send({ msg: "User not found or no payments available" });
      }
    } else {
      res.status(400).send({ msg: "userName is required" }); 
    }
  } catch (err) {
    res.status(500).send({ msg: "Error getting payments", error: err.message });
  }
});

export default paymentRouter;
