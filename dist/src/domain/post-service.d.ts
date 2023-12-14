import { postBodyType, postBodyTypeForBlog } from "../types/post-type";
declare class PostService {
    createPost(post: postBodyType): Promise<import("../types/post-type").postType | null>;
    createPostForBlog(post: postBodyTypeForBlog, id: string): Promise<import("../types/post-type").postType | null>;
    changePost(id: string, payload: postBodyType): Promise<boolean>;
    deletePost(id: string): Promise<boolean>;
    deleteAllPosts(): Promise<void>;
}
export declare const postService: PostService;
export {};
