import express from 'express'
import mongooseConnect from './database/connections/mongoose-connection.js';
import registerRouter from './routes/register.js';
import cors from "cors";
import { connectToDb } from './database/connections/mongo-connection.js';
import loginRouter from './routes/login.js';
import addequipRouter from './routes/addequipment.js';
import bookingRouter from './routes/bookings.js';
import getBookingRouter from './routes/getBookings.js';
import forgotRouter from './routes/forgotPassword.js';
import resetPasswordRouter from './routes/resetPassword.js';
import stripeRouter from './routes/stripepayment.js';
import paymentRouter from './routes/payment.js';
import savePaymentRouter from './routes/savePayments.js';

const server=express();
await mongooseConnect()
await connectToDb()
server.use(cors());
server.use(express.json());


//This custom middleware shows which api is triggered
const customMiddleware=(req,res,next)=>{
    console.log(req);
    console.log(new Date().toString(),
    "Handling request for",
    req.method,
    req.originalUrl
);
next()
}

//routers
server.use(customMiddleware)
server.use('/register',registerRouter);
server.use('/login',loginRouter);
server.use('/addEquip',addequipRouter);
server.use('/bookings',bookingRouter);
server.use('/getBookings',getBookingRouter);
server.use('/forgotPassword',forgotRouter);
server.use('/resetPassword',resetPasswordRouter);
server.use('/stripePayment',stripeRouter)
server.use('/payment',paymentRouter);
server.use('/savePayment',savePaymentRouter);

//server port
const port=7000
server.listen(port,()=>{
    console.log("server listening on port"+ port);
});