import { ObjectId } from "mongodb"
import { paginatorType } from "./paginator-type"



export type CommentInputModelType = {
    content: string
}


type commentatorInfoType = {
    userId: string,
    userLogin: string
}

export type CommentViewModelType = {
    id: string,
    content: string,
    commentatorInfo: commentatorInfoType,
    createdAt: string
}
export type CommentDbModelType = {
    _id: ObjectId,
    content: string,
    commentatorInfo: commentatorInfoType,
    createdAt: string
}
export type viewAllCommentsType = paginatorType & {
    items: CommentViewModelType[]
}