import { ObjectId } from "mongodb";
import { blogDbType, blogType, bodyBlogType } from "../../types/blog-type";
declare class BlogRepository {
    createBlog(blog: blogDbType): Promise<blogType>;
    changeBlog(id: ObjectId, payload: bodyBlogType): Promise<boolean>;
    deleteBlog(id: ObjectId): Promise<boolean>;
    deleteAll(): Promise<boolean>;
}
export declare const blogsRepository: BlogRepository;
export {};
