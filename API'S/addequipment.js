import express from "express";
import { storesModel } from "../Database connection/model.js";
import { db } from "../Database connection/mongo-connection.js";
const addequipRouter=express.Router();

addequipRouter.post("/",async(req,res)=>{
    const userData=req.body;
    const userObj = await storesModel.findOne({ equipmentName: userData.equipmentName })
    if(userObj){
        res.status(400).send({ msg: "Equipment already exist" }); 
    }else{
        try{
        const equipmentId=Date.now().toString();
       const bookingStatus="available"
        const newEquip = new storesModel({
            ...userData,
            equipmentId,
            bookingStatus,
            createdAt: new Date().toISOString()
          });
          await newEquip.save();
          res.send({ msg: "Equipment added successfully" ,code:1});
        }catch(err){
            console.log(err);
             res.status(500).send({ msg: "Server error", err ,code:0});
        }
    }
})

addequipRouter.get("/", async (req, res) => {
    try {
      const collection = db.collection("stores");
      const data = await collection.find({}).toArray(); 
      console.log(data)
      res.status(200).send({ msg: "Data received successfully", code: 1, data });
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: "Data not received" });
    }
  });
export default addequipRouter;
