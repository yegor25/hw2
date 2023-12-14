import { Router, Response, Request } from "express";
import { requestWithBody, requestWithParams, requestWithQuery } from "../types/root-type";
import { userInputType, usersResponseType } from "../types/user-type";
import { checkAuth } from "../middlewares/auth-middleware";
import { userValidate, userValidator } from "../middlewares/user-validation";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { paramsUserPaginatorType } from "../types/paginator-type";
import { UserService } from "../domain/user-service";
import { UserRepository } from "../repositories/mutation/user-repository";
import { userController } from "../composition-root";
// import { userController } from "../composition-root";



export const userRouter = Router({})




userRouter.post("/", checkAuth, userValidator,userController.createUser.bind(userController))
userRouter.get("/", checkAuth, userController.getUsers.bind(userController))
userRouter.delete("/:id", checkAuth,userController.deleteUser.bind(userController) )