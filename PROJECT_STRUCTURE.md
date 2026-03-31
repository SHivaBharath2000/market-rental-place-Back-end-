# CAPSTONE BE - Project Structure

## Professional Folder Organization

This backend project follows a professional MVC-like structure for better maintainability and scalability.

### Folder Structure

```
CAPSTONE BE/
├── src/                              # Main source code directory
│   ├── server.js                     # Main server setup & routes
│   │
│   ├── config/                       # Configuration files
│   │   └── (environment, constants)
│   │
│   ├── database/                     # Database layer
│   │   ├── connections/
│   │   │   ├── mongoose-connection.js # Mongoose DB connection
│   │   │   └── mongo-connection.js    # MongoDB connection
│   │   └── models/
│   │       └── model.js              # All Mongoose schemas and models
│   │
│   ├── routes/                       # API endpoints
│   │   ├── register.js
│   │   ├── login.js
│   │   ├── addequipment.js
│   │   ├── bookings.js
│   │   ├── getBookings.js
│   │   ├── forgotPassword.js
│   │   ├── resetPassword.js
│   │   ├── stripepayment.js
│   │   ├── payment.js
│   │   └── savePayments.js
│   │
│   ├── middleware/                   # Express middlewares
│   │   └── (custom middleware)
│   │
│   ├── services/                     # Business logic & external services
│   │   └── mailUtils.js              # Email sending utilities
│   │
│   └── utils/                        # Helper functions
│       └── (utility functions)
│
├── express-server.js                 # Entry point (imports from src/)
├── package.json
├── .env                              # Environment variables (not in git)
├── .gitignore
└── node_modules/                     # Dependencies


## File Export Formats

### Database Models (src/database/models/model.js)
```javascript
export { userModel, storesModel, bookingModel, paymentsModel }
```

### Database Connections
- **Mongoose**: `export default mongooseConnect`
- **MongoDB**: `export { connectToDb, db }`

### Routes
- All routes export default `Router`

### Services
- **Mail Utils**: `export { mailOptions, transporter, sendUserOrderConfirmation, sendAdminOrderNotification }`


## How to Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables** (.env file)
   ```
   DB_CLUSTER=your_cluster
   DB_NAME=your_db_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_secret
   MAIL_PASS=your_email_password
   FE_URL=http://localhost:5173
   ```

3. **Start the server (with auto-reload)**
   ```bash
   npm run express-server
   ```

   Or run directly:
   ```bash
   node express-server.js
   ```


## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/register` | POST | User registration |
| `/login` | POST | User login |
| `/addEquip` | POST/GET | Add/Get equipment |
| `/bookings` | POST | Create booking |
| `/getBookings` | GET | Get all bookings |
| `/forgotPassword` | POST | Request password reset |
| `/resetPassword` | POST | Reset password |
| `/stripePayment` | POST | Process Stripe payment |
| `/payment` | POST | Get user payments |
| `/savePayment` | POST | Save payment record |


## Migration Notes

Old folder structure can be safely deleted:
- ❌ `API'S/` → ✅ Moved to `src/routes/`
- ❌ `Database connection/` → ✅ Moved to `src/database/`

The `express-server.js` now acts as a clean entry point that imports from the organized `src/` directory.

