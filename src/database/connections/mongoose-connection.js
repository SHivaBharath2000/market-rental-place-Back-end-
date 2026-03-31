import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();



const cloudCluster=process.env.DB_CLUSTER ||"localhost:27017";
const dbName =process.env.DB_NAME||"";
const dbuserName=process.env.DB_USER || ""
const dbPassword=process.env.DB_PASSWORD || "";
const cloudUri=`mongodb+srv://${dbuserName}:${dbPassword}@${cloudCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

const mongooseConnect =async()=>{
try{
    await mongoose.connect(cloudUri);
    console.log("Mongoose Connection established")

}catch(e){
    console.log("Mongoose Connection error"+e.message);
    process.exit(1)
}
}
export default mongooseConnect;