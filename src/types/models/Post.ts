import mongoose  from "mongoose";
import { PostDbType } from "../post-type";
import { ObjectId } from "mongodb";


const postSchema = new mongoose.Schema<PostDbType>({
    _id: {type: ObjectId, default: new ObjectId()},
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: String, required: true},
    blogName: {type: String, required: true},
    createdAt: {type: String, required: true}
})

export const PostModel =  mongoose.model("posts", postSchema)

