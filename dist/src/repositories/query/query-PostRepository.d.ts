import { postType, viewAllPostsType } from "../../types/post-type";
import { paramsPostPaginatorType } from "../../types/paginator-type";
declare class queryPostRepository {
    findPosts(params: paramsPostPaginatorType): Promise<viewAllPostsType>;
    findPostsByBlogId(id: string, params: paramsPostPaginatorType): Promise<viewAllPostsType | null>;
    findPostById(id: string): Promise<postType | null>;
}
export declare const QueryPostRepository: queryPostRepository;
export {};
