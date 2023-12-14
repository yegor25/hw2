import { blogType, bodyBlogType } from "../types/blog-type";
declare class BlogsService {
    createBlog(blog: bodyBlogType): Promise<blogType>;
    changeBlog(id: string, payload: bodyBlogType): Promise<boolean>;
    deleteBlog(id: string): Promise<boolean>;
    deleteAllBlogs(): Promise<boolean>;
}
export declare const blogService: BlogsService;
export {};
