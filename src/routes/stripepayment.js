import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { userModel } from "../database/models/model.js";
import { sendUserOrderConfirmation, sendAdminOrderNotification } from "../services/mailUtils.js";

const stripe = new Stripe("sk_test_51Q2DelFadwIWXwEL9IWiFBmtZsOisVh3HX8MyU0QHfFPlJRGbpu0SANfKMMEDFICwcJNuGzeTVQ5YzsRUuZ2LOql00INm3kThS");
const stripeRouter = express.Router();

// Updated conversion function
const convertINRtoUSD = (rupees) => { 
    const conversionRate = 74.50; 
    let dollars = rupees / conversionRate; 
    return dollars.toFixed(2); 
};

stripeRouter.post("/", async (req, res) => {
    const { token, amount, name, email, equipmentName, bookingId, fromDate, toDate, noOfdays, equipmentId, userId, userName } = req.body;
    console.log(req.body);
    const transactionKey = uuidv4();

    try {
        const amountInUSD = convertINRtoUSD(amount); 
        const amountInCents = Math.round(amountInUSD * 100); 

        // Check if the amount is at least $0.50 USD
        // if (amountInCents < 50) {
        //     return res.status(400).send("Amount must be at least $0.50 USD");
        // }

        const customer = await stripe.customers.create({
            email: email,
            source: token.id
        });

        const charge = await stripe.charges.create({
            amount: amountInCents,
            currency: "usd",
            customer: customer.id,
            receipt_email: email,
            description: name,
        });

        // Payment successful - send emails
        if (charge.status === 'succeeded') {
            // Prepare booking details for email
            const bookingDetails = {
                equipmentName: equipmentName || "",
                bookingId: bookingId || "",
                fromDate: fromDate || "",
                toDate: toDate || "",
                noOfdays: noOfdays || "",
                totalAmount: amount,
                equipmentId: equipmentId || "",
                userId: userId || "",
                userName: userName || name
            };

            // Send confirmation email to user
            await sendUserOrderConfirmation(email, bookingDetails);

            // Fetch admin user details and send notification
            try {
                const adminUser = await userModel.findOne({ isAdmin: true });
                if (adminUser) {
                    await sendAdminOrderNotification(adminUser.email, bookingDetails, userName || name, email);
                } else {
                    console.log("No admin user found in database");
                }
            } catch (adminErr) {
                console.error("Error fetching admin details:", adminErr.message);
            }
        }

        res.status(200).send({code:1, charge});
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
});

export default stripeRouter;