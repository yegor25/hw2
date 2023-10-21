"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatorHelper = void 0;
const paginator_type_1 = require("../../types/paginator-type");
exports.paginatorHelper = {
    blogsParamsMapper(params) {
        const res = {
            searchNameTerm: params.searchNameTerm ? params.searchNameTerm : "",
            sortDirection: params.sortDirection === paginator_type_1.SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : "createdAt"
        };
        return res;
    },
    postParamsMapper(params) {
        const res = {
            sortDirection: params.sortDirection === paginator_type_1.SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : 'createdAt'
        };
        return res;
    },
    usersParamsMapper(params) {
        const res = {
            searchEmailTerm: params.searchEmailTerm ? params.searchEmailTerm : "",
            searchLoginTerm: params.searchLoginTerm ? params.searchLoginTerm : "",
            sortDirection: params.sortDirection === paginator_type_1.SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : "createdAt"
        };
        return res;
    },
    commentsParamsMapper(params) {
        const res = {
            sortDirection: params.sortDirection === paginator_type_1.SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : "createdAt"
        };
        return res;
    }
};
