import { ObjectId } from "mongodb";
import { paginatorType } from "./paginator-type";
export type postType = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
};
export type postBodyType = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
};
export type postBodyTypeForBlog = {
    title: string;
    shortDescription: string;
    content: string;
};
export type PostDbType = {
    _id: ObjectId;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
};
export type viewAllPostsType = paginatorType & {
    items: postType[];
};
