import dotenv from 'dotenv'
import { DB_NAME} from './constants.js';
import connectDB from './db/index.js';
import app from './app.js';



dotenv.config({path:"./.env"})

connectDB()
.then(()=>{
    app.on('error',(error)=>{
        console.log('error occured',error)
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port:${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongo DB connection Failed !!!",error)
})


// import express from 'express'

// const app=express()
// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("error",error)
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`server is running on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error(error)
//     }
// })()