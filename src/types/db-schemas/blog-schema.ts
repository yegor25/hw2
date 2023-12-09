

import mongoose from "mongoose";
import { blogDbType } from "../blog-type";
import { ObjectId } from "mongodb";



export const blogSchema = new mongoose.Schema<blogDbType>({
    _id: ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    isMembership: {type: Boolean}
})
