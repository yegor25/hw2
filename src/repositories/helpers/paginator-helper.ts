import { DefaultPaginatorType, SortDirection, dbCommentsPaginatorType, dbPaginatorType, dbPostsPaginatorType, dbUsersPaginatorType, paramsCommentsPaginatorType, paramsPaginatorType, paramsPostPaginatorType, paramsUserPaginatorType, sortByType } from "../../types/paginator-type";
import { PostDbType } from "../../types/post-type";



export const paginatorHelper = {
    blogsParamsMapper (params: paramsPaginatorType):dbPaginatorType{
        const res:dbPaginatorType = {
            searchNameTerm: params.searchNameTerm ? params.searchNameTerm : "",
            sortDirection: params.sortDirection === SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : "createdAt"

        }
        return res 
    },
    postParamsMapper (params: paramsPostPaginatorType):dbPostsPaginatorType {
        const res:dbPostsPaginatorType = {
            sortDirection: params.sortDirection === SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : 'createdAt'
        }
        return res
    },
    usersParamsMapper(params:paramsUserPaginatorType):dbUsersPaginatorType {
        const res:dbUsersPaginatorType = {
            searchEmailTerm: params.searchEmailTerm ? params.searchEmailTerm : "",
            searchLoginTerm: params.searchLoginTerm ? params.searchLoginTerm : "",
            sortDirection: params.sortDirection === SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : "createdAt"
        }
        return res
    },
    commentsParamsMapper(params: paramsCommentsPaginatorType):dbCommentsPaginatorType {
        const res:dbCommentsPaginatorType = {
            sortDirection: params.sortDirection === SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : "createdAt"
        }
        return res
    }
}