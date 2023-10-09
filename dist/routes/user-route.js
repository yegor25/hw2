"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_service_1 = require("../domain/user-service");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const user_validation_1 = require("../middlewares/user-validation");
exports.userRouter = (0, express_1.Router)({});
exports.userRouter.post("/", auth_middleware_1.checkAuth, user_validation_1.userValidator, user_validation_1.userValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userService.createUser(req.body);
    if (!user) {
        res.sendStatus(400);
        return;
    }
    res.status(201).send(user);
}));
exports.userRouter.delete("/:id", auth_middleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield user_service_1.userService.deleteUser(req.params.id);
    if (!deleteUser) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
