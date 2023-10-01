import { ObjectId } from "mongodb"


export type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type blogDbType = {
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type bodyBlogType = {
    name: string,
    description: string,
    websiteUrl: string
}

