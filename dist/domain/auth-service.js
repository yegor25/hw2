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
exports.authService = void 0;
const mail_manager_1 = require("../managers/mail-manager");
const user_repository_1 = require("../repositories/mutation/user-repository");
const helper_1 = require("./helper");
exports.authService = {
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, login } = data;
            // const existUser = await userCollection.findOne({$or: [{email: email}, {login: login} ]})
            // if(existUser) {
            //     return false
            // }
            const newUser = yield helper_1.helper.userDbViewMapper(data);
            console.log("new", newUser);
            const res = yield user_repository_1.userRepository.createUser(newUser);
            console.log("res", res);
            const message = yield mail_manager_1.mailManager.registerConfirmation(email);
            return true;
        });
    }
};
