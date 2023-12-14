import { PostDbType, postBodyType, postType } from "../../types/post-type";
import { ObjectId } from "mongodb";
declare class PostRepository {
    createPost(post: PostDbType): Promise<postType>;
    createPostForBlog(post: PostDbType): Promise<postType | null>;
    changePost(id: ObjectId, payload: postBodyType): Promise<boolean>;
    deletePost(id: ObjectId): Promise<boolean>;
    deleteAll(): Promise<void>;
}
export declare const postRepository: PostRepository;
export {};
