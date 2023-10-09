import { ObjectId } from "mongodb"


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
    passwordSalt: string
}