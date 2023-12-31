"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const user_validation_1 = require("../middlewares/user-validation");
const composition_root_1 = require("../composition-root");
// import { userController } from "../composition-root";
exports.userRouter = (0, express_1.Router)({});
exports.userRouter.post("/", auth_middleware_1.checkAuth, user_validation_1.userValidator, composition_root_1.userController.createUser.bind(composition_root_1.userController));
exports.userRouter.get("/", auth_middleware_1.checkAuth, composition_root_1.userController.getUsers.bind(composition_root_1.userController));
exports.userRouter.delete("/:id", auth_middleware_1.checkAuth, composition_root_1.userController.deleteUser.bind(composition_root_1.userController));
