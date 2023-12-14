/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { loginType } from "../../types/auth-type";
import { paramsUserPaginatorType } from "../../types/paginator-type";
import { userDbType, usersResponseType } from "../../types/user-type";
import { ObjectId } from "mongodb";
declare class queryUserRepository {
    checkUser(data: loginType): Promise<userDbType | null>;
    findUsers(params: paramsUserPaginatorType): Promise<usersResponseType>;
    findUserById(id: ObjectId): Promise<(import("mongoose").Document<unknown, {}, userDbType> & userDbType & Required<{
        _id: ObjectId;
    }>) | null>;
    findUserByLoginOrEmail(val: string): Promise<userDbType | null>;
}
export declare const QueryUserRepository: queryUserRepository;
export {};
