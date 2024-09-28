import express from "express";
import { bookingModel } from "../Database connection/model.js";


const getBookingRouter = express.Router();

getBookingRouter.get("/", async (req, res) => {
    try{
    const bookings = await bookingModel.find();
    console.log(bookings)
    res.send({ msg: "Bookings fetched successfully", bookings });
    }catch(err){
        res.status(500).send({ msg: "Error getting bookings", error: err.message });
    }
});

export default getBookingRouter