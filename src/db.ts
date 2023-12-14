import dotenv from "dotenv"
import { blogDbType } from "./types/blog-type"
import { userDbType } from "./types/user-type"
import { TokenDbType } from "./types/tokens-type"
import { securityDevicesDbType } from "./types/securityDevices-type"
import { requestUserDbType, requestUserType } from "./types/requestUserType"
import mongoose from "mongoose"
import { postSchema } from "./types/db-schemas/Post"
import { oldPasswordSchema } from "./types/db-schemas/OldPasswors"
import { commentsLikesInfoSchema, commentsSchema } from "./types/db-schemas/Comments"
import { userSchema } from "./types/db-schemas/user-schema"
import { blogSchema } from "./types/db-schemas/blog-schema"
import { tokenSchema } from "./types/db-schemas/tokens-schema"
import { securityDeviceSchema } from "./types/db-schemas/securityDevice-schema"
import { reqUserSchema } from "./types/db-schemas/reqUser-schema"
import { likePostSchema } from "./types/db-schemas/likePost-schema"
dotenv.config()

const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017"




export const PostModel =  mongoose.model("posts", postSchema)
export const OldPassword = mongoose.model("oldPasswords", oldPasswordSchema)
export const BlogModel = mongoose.model<blogDbType>('blogs', blogSchema)
export const UserModel = mongoose.model<userDbType>('users',userSchema)
export const CommentsModel = mongoose.model('comments', commentsSchema)
export const TokenModel = mongoose.model<TokenDbType>('tokens',tokenSchema)
export const SecurityDevicesModel = mongoose.model<securityDevicesDbType>("securityDevices", securityDeviceSchema)
export const ReqUserModel = mongoose.model<requestUserDbType>("requestUsers",reqUserSchema)
export const LikeCommentsModel = mongoose.model("likeComments", commentsLikesInfoSchema)
export const LikePostsNewest = mongoose.model("newestLikes",likePostSchema)

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
