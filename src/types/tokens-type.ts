import { ObjectId } from "mongodb"



export type TokenDbType = {
    _id: ObjectId,
    token: string,
    userId: string
}