import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe("sk_test_51Q2DelFadwIWXwEL9IWiFBmtZsOisVh3HX8MyU0QHfFPlJRGbpu0SANfKMMEDFICwcJNuGzeTVQ5YzsRUuZ2LOql00INm3kThS");
const stripeRouter = express.Router();

// Updated conversion function
const convertINRtoUSD = (rupees) => { 
    const conversionRate = 74.50; 
    let dollars = rupees / conversionRate; 
    return dollars.toFixed(2); 
};

stripeRouter.post("/", async (req, res) => {
    const { token, amount, name, email } = req.body;
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

        res.status(200).send({code:1, charge});
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
});

export default stripeRouter;
