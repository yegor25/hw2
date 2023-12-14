import { dbCommentsPaginatorType, dbPaginatorType, dbPostsPaginatorType, dbUsersPaginatorType, paramsCommentsPaginatorType, paramsPaginatorType, paramsPostPaginatorType, paramsUserPaginatorType } from "../../types/paginator-type";
export declare const paginatorHelper: {
    blogsParamsMapper(params: paramsPaginatorType): dbPaginatorType;
    postParamsMapper(params: paramsPostPaginatorType): dbPostsPaginatorType;
    usersParamsMapper(params: paramsUserPaginatorType): dbUsersPaginatorType;
    commentsParamsMapper(params: paramsCommentsPaginatorType): dbCommentsPaginatorType;
};
