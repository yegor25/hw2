import { ObjectId } from "mongodb"


export type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type postBodyType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}


export type PostDbType = {
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}


