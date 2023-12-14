import { UserService } from "../../domain/user-service"
import { QueryUserRepository } from "../../repositories/query/query-UserRepository"
import { paramsUserPaginatorType } from "../../types/paginator-type"
import { requestWithBody, requestWithQuery, requestWithParams } from "../../types/root-type"
import { userInputType } from "../../types/user-type"
import { Request, Response } from "express"

export class UserController {
    constructor(protected userService: UserService){}
    async createUser(req: requestWithBody<userInputType>, res: Response) {
        const user = await this.userService.createUser(req.body)
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
        const deleteUser = await this.userService.deleteUser(req.params.id)
        if (!deleteUser) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }
}