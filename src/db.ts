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
dotenv.config()

const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017"

const dbName = "my-db"
const client = new MongoClient(url)

export const db = client.db(dbName)


// export const postsCollection = db.collection<PostDbType>('posts')
export const blogCollection = db.collection<blogDbType>('blogs')
export const userCollection = db.collection<userDbType>('users')
export const commentsCollection = db.collection<CommentDbModelType>('comments')
export const tokensCollection = db.collection<TokenDbType>('tokens')
export const securityDevicesCollection = db.collection<securityDevicesDbType>("securityDevices")
export const requestUserCollections = db.collection<requestUserDbType>("requestUsers")

export const runDb = async () => {
    try {
        await mongoose.connect(url + "/" + dbName + "?w=majority")
        console.log("db is connected")
    } catch (error) {
        console.log("err",error)
        console.log("database is disconnect")
        await mongoose.disconnect()
    }
}