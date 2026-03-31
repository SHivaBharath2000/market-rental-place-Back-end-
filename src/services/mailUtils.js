
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

// Send order confirmation email to user
const sendUserOrderConfirmation = async (userEmail, bookingDetails) => {
    const mailOptions = {
        from: "developsiva@gmail.com",
        to: userEmail,
        subject: "Your Order Confirmed Successfully! 🎉",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
                .header h1 { margin: 0; font-size: 28px; }
                .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .order-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #667eea; }
                .order-id { font-size: 18px; color: #667eea; font-weight: bold; }
                .label { color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
                .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
                .success-icon { font-size: 50px; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="success-icon">✓</div>
                    <h1>Order Successfully Confirmed!</h1>
                </div>
                <div class="content">
                    <p style="font-size: 16px; color: #333;">Hi,</p>
                    <p>Your order has been successfully placed and confirmed!</p>
                    
                    <div class="order-box">
                        <div class="label">Order ID</div>
                        <div class="order-id">${bookingDetails.bookingId}</div>
                    </div>

                    <p style="margin-top: 25px;">Thank you for your order.</p>

                    <div class="footer">
                        <p>© 2026 Equipment Rental</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `,
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log("User confirmation email sent successfully");
    } catch (err) {
        console.error("Error sending user email:", err.message);
    }
};

// Send order notification email to admin
const sendAdminOrderNotification = async (adminEmail, bookingDetails, userName, userEmail) => {
    const mailOptions = {
        from: "developsiva@gmail.com",
        to: adminEmail,
        subject: "New Order Received - Action Required 📋",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 700px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .header h1 { margin: 0; font-size: 26px; }
                .content { background-color: #f5f5f5; padding: 30px; border-radius: 0 0 10px 10px; }
                .alert { background: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
                .info-section { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-top: 3px solid #1a237e; }
                .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
                .info-row:last-child { border-bottom: none; }
                .label { color: #666; font-weight: 600; }
                .value { color: #1a237e; font-weight: bold; font-size: 16px; }
                .order-id-highlight { background: #e3f2fd; padding: 20px; border-radius: 5px; text-align: center; margin: 15px 0; }
                .order-id-label { color: #666; font-size: 12px; text-transform: uppercase; }
                .order-id-value { font-size: 24px; color: #1a237e; font-weight: bold; margin-top: 8px; }
                .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📋 New Order Received</h1>
                </div>
                <div class="content">
                    <div class="alert">
                        <strong>✓ Order Successfully Placed!</strong>
                    </div>

                    <div class="order-id-highlight">
                        <div class="order-id-label">Order ID</div>
                        <div class="order-id-value">${bookingDetails.bookingId}</div>
                    </div>

                    <div class="info-section">
                        <h3 style="margin-top: 0; color: #1a237e; border-bottom: 1px solid #eee; padding-bottom: 10px;">Customer Name</h3>
                        <div class="info-row">
                            <span class="value" style="font-size: 18px;">${userName}</span>
                        </div>
                    </div>

                    <div class="footer">
                        <p>© 2026 Equipment Rental Admin</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `,
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log("Admin notification email sent successfully");
    } catch (err) {
        console.error("Error sending admin email:", err.message);
    }
};

const mailOptions = {
    from: "developsiva@gmail.com",
    to: ["sivabharath990@gmail.com"],
    subject: "Email Testing",
    text: "Sending mails are so easy",
  };
  
  export { mailOptions, transporter, sendUserOrderConfirmation, sendAdminOrderNotification };