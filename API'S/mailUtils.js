
import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"developsiva@gmail.com",
        pass:process.env.MAIL_PASS||'',
    }
})
const mailOptions = {
    from: "developsiva@gmail.com",
    to: ["sivabharath990@gmail.com"],
    subject: "Email Testing",
    text: "Sending mails are so easy",
  };
  
  export { mailOptions, transporter };