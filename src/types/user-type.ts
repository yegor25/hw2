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

export class userDbType {
    constructor(
        public _id: ObjectId,
        public login: string,
        public email: string,
        public createdAt: string,
        public hashPassword: string,
        public passwordSalt: string,
        public emailConfirmation: {
            code: string,
            isConfirmed: boolean,
            expirationDate: Date
        }
    ) {

    }
}

export type usersResponseType = paginatorType & {
    items: userViewType[]
}
export type userConfirmationType = {
    code: string,
    isConfirmed: boolean,
    expirationDate: Date
}
export type passRecoveryDbType = {
    _id: ObjectId,
    userId: string,
    recoveryCode: string,
    expirationDate: Date
}

