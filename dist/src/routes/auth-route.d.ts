import { Request, Response } from "express";
import { requestWithBody } from "../types/root-type";
import { loginType } from "../types/auth-type";
import { userInputType } from "../types/user-type";
import { AuthService } from "../domain/auth-service";
import { UserService } from "../domain/user-service";
export declare const authRouter: import("express-serve-static-core").Router;
export declare class AuthController {
    protected authService: AuthService;
    protected userService: UserService;
    constructor(authService: AuthService, userService: UserService);
    loginUser(req: requestWithBody<loginType>, res: Response): Promise<void>;
    register(req: requestWithBody<userInputType>, res: Response): Promise<void>;
    registerConfirmation(req: requestWithBody<{
        code: string;
    }>, res: Response): Promise<void>;
    resendingEmail(req: requestWithBody<{
        email: string;
    }>, res: Response): Promise<void>;
    authMe(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    refreshToken(req: Request, res: Response): Promise<void>;
    recoverPass(req: requestWithBody<{
        email: string;
    }>, res: Response): Promise<void>;
    changePswd(req: requestWithBody<{
        newPassword: string;
        recoveryCode: string;
    }>, res: Response): Promise<void>;
}
