import { Router, Request, Response } from "express";
import { postService } from "../domain/post-service";
import { blogService } from "../domain/blog-service";
import { commentService } from "../domain/comment-service";
import { sessionService } from "../domain/session-service";
import { UserService } from "../domain/user-service";
import { UserRepository } from "../repositories/mutation/user-repository";



export const testingRouter = Router({})
const userService = new UserService(new UserRepository())
testingRouter.delete("/all-data", async (req, res) => {
   try {
      const posts = await postService.deleteAllPosts()
const blogs = await blogService.deleteAllBlogs()
const users = await userService.deleteAllUsers()
const comments = await commentService.deleteAllComments()
const sessions = await sessionService.deleteAllsessions()
   return res.sendStatus(204)
   } catch (error) {
      res.send("error")
      return
   }

    
})