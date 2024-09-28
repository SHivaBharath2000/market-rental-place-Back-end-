import express from 'express'
import mongooseConnect from './Database connection/mongoose-connection.js';
import registerRouter from './API\'S/register.js';
import cors from "cors";
import connectToDb from './Database connection/mongo-connection.js';
import loginRouter from './API\'S/login.js';
import addequipRouter from './API\'S/addequipment.js';
import bookingRouter from './API\'S/bookings.js';
import getBookingRouter from './API\'S/getBookings.js';
import forgotRouter from './API\'S/forgotPassword.js';
import resetPasswordRouter from './API\'S/resetPassword.js';
import stripeRouter from './API\'S/stripepayment.js';
import paymentRouter from './API\'S/payment.js';
import savePaymentRouter from './API\'S/savePayments.js';

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

})