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
import { ObjectId } from "mongodb";
import { CommentDbModelType, CommentViewModelType, viewAllCommentsType } from "../../types/comment-type";
import { paramsCommentsPaginatorType } from "../../types/paginator-type";
import { commentMethodsType } from "../../types/db-schemas/Comments";
declare class queryCommentsRepository {
    getCommentsById(id: string, userId: string | undefined): Promise<CommentViewModelType | null>;
    getCommentModelById(id: string): Promise<(import("mongoose").Document<unknown, {}, CommentDbModelType> & Omit<CommentDbModelType & Required<{
        _id: ObjectId;
    }>, keyof commentMethodsType> & commentMethodsType) | null>;
    getComments(params: paramsCommentsPaginatorType, postId: string, userId: string | undefined): Promise<viewAllCommentsType>;
}
export declare const QueryCommentsRepository: queryCommentsRepository;
export {};
