import { PostDbType, postType } from "../../types/post-type";
export declare const postHelper: {
    convertArrayDTO(posts: PostDbType[]): postType[];
    mapPostToView(post: PostDbType): postType;
};
