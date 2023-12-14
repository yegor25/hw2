import { Response } from "express";
import { requestWithBody, requestWithParams, requestWithQuery } from "../types/root-type";
import { userInputType } from "../types/user-type";
import { paramsUserPaginatorType } from "../types/paginator-type";
import { UserService } from "../domain/user-service";
export declare const userRouter: import("express-serve-static-core").Router;
export declare class UserController {
    protected userService: UserService;
    constructor(userService: UserService);
    createUser(req: requestWithBody<userInputType>, res: Response): Promise<void>;
    getUsers(req: requestWithQuery<paramsUserPaginatorType>, res: Response): Promise<void>;
    deleteUser(req: requestWithParams<{
        id: string;
    }>, res: Response): Promise<void>;
}
