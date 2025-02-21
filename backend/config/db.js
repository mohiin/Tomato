
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.ATLASDB_URL;

const connectDB = async ()=>{
    await mongoose.connect(dbUrl)
    .then(()=>{
        console.log("DB connected!");
    })
    .catch(()=>{
        console.log("DB connection is failed!");
    })
}

export default connectDB;