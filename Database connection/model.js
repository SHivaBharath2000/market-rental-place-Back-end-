import mongoose from "mongoose";
const userSchema = new mongoose.Schema({// 
    id: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    phoneNo: {
        type: "string",
        required: true,
      },
    password: {
      type: "string",
      required: true,
    },
    isAdmin: {
      type: "boolean",
      required: false,
    },
    createdAt: {
        type: "string",
        required: true,
      },
    
  });

  const storesSchema = new mongoose.Schema({// 
    equipmentId: {
      type: "string",
      required: true,
    },
    equipmentName: {
      type: "string",
      required: true,
    },
    src: {
      type: "string",
      required: true,
    },
    description: {
        type: "string",
        required: true,
      },
    rentRates: {
      type: "string",
      required: true,
    },
    bookingStatus: {
      type: "String",
      required: false,
    },
    createdAt: {
        type: "string",
        required: true,
      },
    
  });

  const bookingSchema = new mongoose.Schema({// 
    equipmentId: {
      type: "string",
      required: true,
    },
    equipmentName: {
      type: "string",
      required: true,
    },
    bookingId: {
      type: "string",
      required: true,
    },
    userName: {
        type: "string",
        required: true,
      },
    userId: {
      type: "string",
      required: true,
    },
    fromDate: {
      type: "string",
      required: false,
    },
     toDate: {
        type: "string",
        required: true,
      },
      noOfdays: {
        type: "string",
        required: true,
      },
      totalAmount: {
        type: "string",
        required: true,
      },
    
  });

  const paymentSchema = new mongoose.Schema({// 

    paymentId: {
      type: "string",
      required: true,
    },
    equipmentId: {
      type: "string",
      required: true,
    },
    equipmentName: {
      type: "string",
      required: true,
    },
    bookingId: {
      type: "string",
      required: true,
    },
    userName: {
        type: "string",
        required: true,
      },
    userId: {
      type: "string",
      required: true,
    },
      noOfdays: {
        type: "string",
        required: true,
      },
      totalAmount: {
        type: "string",
        required: true,
      },
      paymentStatus:{
        type:"string",
        required: true
      }
    
  });

  const userModel = new mongoose.model("user", userSchema, "users");
  const storesModel = new mongoose.model("stores", storesSchema, "stores");
  const bookingModel = new mongoose.model("Bookings", bookingSchema, "Bookings");
  const paymentsModel = new mongoose.model("Payments", paymentSchema, "Payments");
  export {userModel ,storesModel,bookingModel,paymentsModel};