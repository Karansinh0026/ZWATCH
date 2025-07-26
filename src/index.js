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
        console.log(`Server is running on port: http://localhost:${process.env.PORT || 8000}`)
    })
})
.catch((error)=>{
    console.log("Mongo DB connection Failed !!!",error)
})


