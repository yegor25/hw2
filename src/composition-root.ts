import { jwtService } from "./application/jwt-service";
import { AuthService } from "./domain/auth-service";
import { sessionService } from "./domain/session-service";
import { UserService } from "./domain/user-service";
import { UserRepository } from "./repositories/mutation/user-repository";
import { QueryUserRepository } from "./repositories/query/query-UserRepository";

import { AuthController } from "./routes/controllers/auth-controller";
import { UserController } from "./routes/controllers/user-controller";

const userRepository:UserRepository = new UserRepository()
const userService:UserService = new UserService(userRepository)
export const userController:UserController = new UserController(userService)

const authService:AuthService = new AuthService(userRepository)
export const authControllerInstance:AuthController = new AuthController(authService,userService)
