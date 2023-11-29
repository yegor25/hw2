import { Router, Response, Request } from "express";
import { requestWithBody, requestWithParams, requestWithQuery } from "../types/root-type";
import { userInputType, usersResponseType } from "../types/user-type";
import { userService } from "../domain/user-service";
import { checkAuth } from "../middlewares/auth-middleware";
import { userValidate, userValidator } from "../middlewares/user-validation";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { paramsUserPaginatorType } from "../types/paginator-type";



export const userRouter = Router({})


class UserRouter {
    async createUser(req: requestWithBody<userInputType>, res: Response) {
        const user = await userService.createUser(req.body)
        if (!user) {
            res.sendStatus(400)
            return
        }
        res.status(201).send(user)
    }
    async getUsers(req: requestWithQuery<paramsUserPaginatorType>, res: Response) {
        const users = await QueryUserRepository.findUsers(req.query)
        res.status(200).send(users)
    }

    async deleteUser(req: requestWithParams<{ id: string }>, res: Response) {
        const deleteUser = await userService.deleteUser(req.params.id)
        if (!deleteUser) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }
}
const userController = new UserRouter()
userRouter.post("/", checkAuth, userValidator,userController.createUser)
userRouter.get("/", checkAuth, userController.getUsers)
userRouter.delete("/:id", checkAuth,userController.deleteUser )