import { LikeStatus } from "../../types/like-type"
import { extendedLikesInfo } from "../../types/post-likeType"
import { PostDbType, postType } from "../../types/post-type"



export const postHelper = {
   convertArrayDTO(posts: PostDbType[]): postType[]{
        const data:postType[] = posts.map(el =>  (
            {
                id: el._id.toString(),
                title: el.title,
                shortDescription: el.shortDescription,
                content: el.content,
                blogId: el.blogId,
                blogName: el.blogName,
                 createdAt: el.createdAt,
                 extendedLikesInfo: {
                    likesCount: 0,
                    dislikesCount: 0,
                    myStatus: LikeStatus.None,
                    newestLikes: []
                 }
            }
        ))
        return data
    },
     mapPostToView(post: PostDbType, likes: extendedLikesInfo): postType {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: likes
        }
    }
}