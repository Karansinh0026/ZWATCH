import { use } from "react";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/Apierror.js";
import {User} from  "../models/user.model.js"
import uploadOnCloud from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asynchandler(async (req,res)=>{
    /*steps during registeration are:
   `1.get user details from frontend 
    2.validate the details if the details are correct
    3.check if user already exits :check using username and email
    4.check for images and check for avatar
    5.upload in cloudinary,check for avatar
    6.create user object - create entry in db
    7.remove password and refresh token feild from responmse
    8.check for user creation
    9.return response else error
    */

    const {fullName,email,username,password} = req.body
    // console.log("email:",email)
    // console.log("fullName:",fullName)
    // console.log("username:",username)


    // Now validate if every feild is present

    if(fullName === "" || username === "" || password === "" || email === ""){
        throw new ApiError(400,"All Feilds is Requird")
    }

    const existeduser = User.findOne({
        $or:[{username},{email}]
    })

    if (existeduser) {
        throw new ApiError(409, "user with email or username already exist")
    }

    console.log(req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path  //when you add multer middleware then some new feilds are inserted in requset object like feilds
    const coverImageLocalPath = req.files?.coverImage[0]?.path // here ? means optional if feilds are present either not present and avatar[0]


    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloud(avatarLocalPath)
    const coverImage = await uploadOnCloud(coverImageLocalPath)

    if(!avater){
        throw new ApiError(400,"Avatar file is required")
    }


    const user=await User.create({
        fullName,
        avatar:avatar.url,  // because on cloudinary method we return whole response object and we need url
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createduser){
        throw new ApiError(500,"Something went wrong while registering a user")
    }

    res.status(201).json(
        new ApiResponse(200,createduser,"user Registered sucessfully")
    )
})

export {registerUser}