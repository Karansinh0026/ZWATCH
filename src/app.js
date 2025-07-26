import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,  //which url are allowed is written in origin its like whitelisting of urls
    credentials :true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public")) 
app.use(cookieParser())

// routes

import userRouter from './routes/user.routes.js' // in user.routes we export router nut here we rename  and use it as userRouter

// router decleration

app.use("/api/v1/users",userRouter)

// http://3000/api/v1/users/register
export default app