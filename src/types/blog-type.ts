import { ObjectId } from "mongodb"


export type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}
export type blogDbType = {
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string
}
export type bodyBlogType = {
    name: string,
    description: string,
    websiteUrl: string
}

