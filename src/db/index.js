import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import express from 'express';
const app =express()

const connectDB = async()=>{
    try {
       const connectionInstance= await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`connection sucess!! DB Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("error111",error)
    }
}

export default connectDB