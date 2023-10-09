import { SortDirection, dbPaginatorType, dbPostsPaginatorType, paramsPaginatorType, paramsPostPaginatorType, sortByType } from "../../types/paginator-type";



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
            sortBy: params.sortBy ? params.sortBy : "createdAt"
        }
        return res
    }
}