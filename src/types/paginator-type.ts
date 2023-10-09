import { blogType } from "./blog-type"
import { postType } from "./post-type"
import { userViewType } from "./user-type"


export type paginatorType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
}
export type paramsPaginatorType = {
    searchNameTerm: string | null,
    sortBy: sortByType,
    sortDirection: SortDirection,
    pageNumber: number,
    pageSize: number
}


export type dbPaginatorType = {
    searchNameTerm: string,
    sortBy: keyof blogType,
    sortDirection: 1 | -1,
    pageNumber: number,
    pageSize: number
}
export type dbPostsPaginatorType = {
    sortBy: keyof postType,
    sortDirection: 1 | -1,
    pageNumber: number,
    pageSize: number
}
export type dbUsersPaginatorType = {
    searchLoginTerm: string,
    searchEmailTerm: string,
    sortBy: keyof userViewType,
    sortDirection: 1 | -1,
    pageNumber: number,
    pageSize: number
}
export type paramsPostPaginatorType = {
    sortBy: keyof postType,
    sortDirection: SortDirection,
    pageNumber: number,
    pageSize: number
}
export type paramsUserPaginatorType = {
    searchLoginTerm: string,
    searchEmailTerm: string,
    sortBy: keyof userViewType,
    sortDirection: SortDirection,
    pageNumber: number,
    pageSize: number
}
export type sortByType = keyof blogType
export enum SortDirection  {
    asc = "asc",
    desc = "desc"
}
