import { ObjectId } from "mongodb";
import { paginatorType } from "./paginator-type";
export type userInputType = {
    login: string;
    password: string;
    email: string;
};
export type userViewType = {
    id: string;
    login: string;
    email: string;
    createdAt: string;
};
export declare class userDbType {
    _id: ObjectId;
    login: string;
    email: string;
    createdAt: string;
    hashPassword: string;
    passwordSalt: string;
    emailConfirmation: {
        code: string;
        isConfirmed: boolean;
        expirationDate: Date;
    };
    constructor(_id: ObjectId, login: string, email: string, createdAt: string, hashPassword: string, passwordSalt: string, emailConfirmation: {
        code: string;
        isConfirmed: boolean;
        expirationDate: Date;
    });
}
export type usersResponseType = paginatorType & {
    items: userViewType[];
};
export type userConfirmationType = {
    code: string;
    isConfirmed: boolean;
    expirationDate: Date;
};
export type passRecoveryDbType = {
    _id: ObjectId;
    userId: string;
    recoveryCode: string;
    expirationDate: Date;
};
