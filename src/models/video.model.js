import mongoose, { mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";//used to get data efficiently using aggregate pipeline in mongodb

const videoSchema=new mongoose.Schema({
    videoFile:{
        type:String,// cloudinary url
        required:true,
    },
    thumbnail:{
        type:String,// cloudinary url
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number, // cloudinary actually send video info like duration,etc
        required:true,
    },
    views:{
        type:Number,
        required:true,
        default:0 
    },
    isPublished:{
        type:Boolean,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
    
},{timestamps:true})


videoSchema.plugin(mongooseAggregatePaginate) // need to learn what it will do 

export const Video = mongoose.model("Video",videoSchema)