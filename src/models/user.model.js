import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken" // Note: JWT is a bearer token 
import bcrypt from "bcrypt"   // use to hash (encode) and decode data from db 

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        // index is used in mongodb to make your search optimised 
        index:true   
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
         type:String,//cloudinary url
        required:true,
    },
    coverImage:{
        type:String,//cloudinary url
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"] //by this way you can add message if password is not entered correctly
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",function(next){ // .pre is used when before something is going to happen for example here is it save then before saving anything this middleware is used
    if(!this.isModified("password")) return next() // is modified method check if this datafeild is modified or not
    
    this.password = bcrypt.hash(this.password,10) // this bcrypt.hash is used to encrypt the password and the int is salt round
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        } 
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id, // Refresh token has less info than access token
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)