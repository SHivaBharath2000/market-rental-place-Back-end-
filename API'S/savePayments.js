import express from "express";
import { db } from "../Database connection/mongo-connection.js";
import { paymentsModel } from "../Database connection/model.js";

const savePaymentRouter = express.Router();

savePaymentRouter.post("/", async (req, res) => {
    const userData = req.body;
    try {
        const newPayment = new paymentsModel({
            ...userData,
        });
        await newPayment.save(); // Save the new payment to the database
        res.send({ msg: "Payment added successfully", code: 1 }); 
    }catch (err) {
        res.status(500).send({ msg: "Error adding payment", error: err.message });
    }
});

export default savePaymentRouter;