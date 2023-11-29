import { MongoClient } from "mongodb"
import { PostDbType } from "./types/post-type"
import dotenv from "dotenv"
import { blogDbType } from "./types/blog-type"
import { userDbType } from "./types/user-type"
import { CommentDbModelType } from "./types/comment-type"
import { TokenDbType } from "./types/tokens-type"
import { securityDevicesDbType } from "./types/securityDevices-type"
import { requestUserDbType, requestUserType } from "./types/requestUserType"
import mongoose from "mongoose"
import { postSchema } from "./types/models/Post"
import { oldPasswordSchema } from "./types/models/OldPasswors"
import { commentsLikesInfoSchema, commentsSchema } from "./types/models/Comments"
dotenv.config()

const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017"

const dbName = "my-db"
const client = new MongoClient(url)

export const db = client.db(dbName)


export const PostModel =  mongoose.model("posts", postSchema)
export const OldPassword = mongoose.model("oldPasswords", oldPasswordSchema)
export const blogCollection = db.collection<blogDbType>('blogs')
export const userCollection = db.collection<userDbType>('users')
export const CommentsModel = mongoose.model('comments', commentsSchema)
export const tokensCollection = db.collection<TokenDbType>('tokens')
export const securityDevicesCollection = db.collection<securityDevicesDbType>("securityDevices")
export const requestUserCollections = db.collection<requestUserDbType>("requestUsers")
export const LikeCommentsModel = mongoose.model("likeComments", commentsLikesInfoSchema)

export const runDb = async () => {
    try {
        await mongoose.connect(url)
        console.log("db is connected")
    } catch (error) {
        console.log("err",error)
        console.log("database is disconnect")
        await mongoose.disconnect()
    }
}
