import {MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();
//Mongo Running URI
// const dbCluster='127.0.0.1:27017';
const cloudCluster=process.env.DB_CLUSTER ||"cluster0.m9a8kj2.mongodb.net";
const dbName =process.env.DB_NAME||"tamil-combined";
const dbuserName=process.env.DB_USER || ""
const dbPassword=process.env.DB_PASSWORD || "";
const cloudUri=`mongodb+srv://${dbuserName}:${dbPassword}@${cloudCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
// const localUri=`mongodb://${dbCluster}/${dbName}`;
const client =new MongoClient(cloudUri);
const db=client.db(dbName);



const connectToDb=async()=>{
    try{
        await client.connect();
        console.log("DB CONNECTED SUCCESSFULLY")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
export { db };
export default connectToDb;