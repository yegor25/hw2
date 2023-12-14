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
exports.UserController = void 0;
const query_UserRepository_1 = require("../../repositories/query/query-UserRepository");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.createUser(req.body);
            if (!user) {
                res.sendStatus(400);
                return;
            }
            res.status(201).send(user);
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield query_UserRepository_1.QueryUserRepository.findUsers(req.query);
            res.status(200).send(users);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUser = yield this.userService.deleteUser(req.params.id);
            if (!deleteUser) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(204);
        });
    }
}
exports.UserController = UserController;
