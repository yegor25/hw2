import { ObjectId } from "mongodb"
import { postsCollection } from "../../db"
import { PostDbType, postType } from "../../types/post-type"
import { postHelper } from "../helpers/post-helper"


const convertId = (id: string) => new ObjectId(id)

export const QueryPostRepository = {
   
    async findPosts():Promise<postType[]> {
        const res = await postsCollection.find({}).toArray()
        return postHelper.convertArrayDTO(res)
     },
     async findPostById(id: string): Promise<postType | null>  {
        
        const post = await postsCollection.findOne({_id: convertId(id)})
        if(!post) return null
        return postHelper.mapPostToView(post)
    },
}