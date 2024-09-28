import express from "express";
import { bookingModel } from "../Database connection/model.js";
import { db } from "../Database connection/mongo-connection.js";

const bookingRouter = express.Router();

bookingRouter.post("/", async (req, res) => {
    const userData = req.body;
    const userObj = await bookingModel.findOne({ bookingId: userData.bookingId });

    if (userObj) {
        res.status(400).send({ msg: "Booking already exists"});
    } else {
        try {
            const newBooking = new bookingModel({
                ...userData,
            });

            await newBooking.save(); // Save the new booking to the database

            res.status(201).send({ msg: "Booking created successfully", booking: newBooking ,Code:1});
        } catch (err) {
            res.status(500).send({ msg: "Error creating booking", error: err.message });
        }
    }
});

export default bookingRouter;
