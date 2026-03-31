import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;

const cloudUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const mongooseConnect = async () => {
  try {
    if (!DB_USER || !DB_PASSWORD) {
      throw new Error("Missing DB_USER or DB_PASSWORD in .env file");
    }

    await mongoose.connect(cloudUri);
    console.log("Mongoose Connection established");
  } catch (e) {
    console.log("Mongoose Connection error: " + e.message);
    process.exit(1);
  }
};

export default mongooseConnect;