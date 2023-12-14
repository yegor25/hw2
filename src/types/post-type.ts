import { ObjectId } from "mongodb"
import { paginatorType } from "./paginator-type"
import { extendedLikesInfo, postLikeDbType } from "./post-likeType"


export type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
    extendedLikesInfo: extendedLikesInfo,
}


export type postBodyType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}
export type postBodyTypeForBlog = {
    title: string,
    shortDescription: string,
    content: string,
}


export type PostDbType = {
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
    likesPost: postLikeDbType[]
}
export type viewAllPostsType = paginatorType & {
    items: postType[]
}