//create shape of videos
import mongoose from "mongoose";

const VideosSchema = new mongoose.Schema({
    fileUrl:{
        type:String,
        required:'File URL is required'
    },
    title:{
        type:String,
        required:"Title is required"
    },
    description:String,
    views:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

const model = mongoose.model('Video', VideosSchema);

export default model;