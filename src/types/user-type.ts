import { ObjectId } from "mongodb"
import { paginatorType } from "./paginator-type"


export type userInputType = {
    login: string,
    password: string,
    email: string
}

export type userViewType = {
    id: string,
    login: string,
    email: string,
    createdAt: string,
    
}
export type userDbType = {
    _id: ObjectId,
    login: string,
    email: string,
    createdAt: string,
    hashPassword: string,
    passwordSalt: string,
    emailConfirmation: userConfirmationType
}
export type usersResponseType = paginatorType & {
    items: userViewType[]
}
export type userConfirmationType = {
    code: string,
    isConfirmed: boolean,
    expirationDate: string
}