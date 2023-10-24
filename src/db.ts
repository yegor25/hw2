import { MongoClient } from "mongodb"
import { PostDbType } from "./types/post-type"
import dotenv from "dotenv"
import { blogDbType } from "./types/blog-type"
import { userDbType } from "./types/user-type"
import { CommentDbModelType } from "./types/comment-type"
import { TokenDbType } from "./types/tokens-type"
dotenv.config()

const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017"


const client = new MongoClient(url)

export const db = client.db('my-db')


export const postsCollection = db.collection<PostDbType>('posts')
export const blogCollection = db.collection<blogDbType>('blogs')
export const userCollection = db.collection<userDbType>('users')
export const commentsCollection = db.collection<CommentDbModelType>('comments')
export const tokensCollection = db.collection<TokenDbType>('tokens')


export const runDb = async () => {
    try {
        await client.connect()
        console.log("db is connected")
    } catch (error) {
        console.log("err",error)
        console.log("database is disconnect")
        await client.close()
    }
}