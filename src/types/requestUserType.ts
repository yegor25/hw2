import { ObjectId } from "mongodb"



export type requestUserType = {
    IP: string,
    URL: string,
    date: Date
}
export type requestUserDbType = requestUserType & {_id: ObjectId}