//cloudinary is used to store images in cloud
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
// this is to config cloudinary so that it know who is it
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET 

});

const uploadOnCloud = async (localFilePath)=>{
    try {
        //if file not found then return null
        if (!localFilePath) return null
        //to upload file
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        
        console.log("file has been uploaded sucessfully",response.url)

        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // if any error occur then this method removes the locally saved files
        // as the upload operation got failed
        return null       
    }
}

export default uploadOnCloud