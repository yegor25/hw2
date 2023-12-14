import { blogType, viewAllBlogsType } from "../../types/blog-type";
import { paramsPaginatorType } from "../../types/paginator-type";
declare class queryBlogRepositiry {
    findBlogs(params: paramsPaginatorType): Promise<viewAllBlogsType>;
    findBlogById(id: string): Promise<blogType | null>;
}
export declare const QueryBlogRepositiry: queryBlogRepositiry;
export {};
