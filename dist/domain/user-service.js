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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongodb_1 = require("mongodb");
const user_repository_1 = require("../repositories/mutation/user-repository");
const user_type_1 = require("../types/user-type");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_service_1 = require("../application/crypto-service");
const query_recoveryPass_1 = require("../repositories/query/query-recoveryPass");
const query_UserRepository_1 = require("../repositories/query/query-UserRepository");
const oldPassword_repository_1 = require("../repositories/mutation/oldPassword-repository");
const db_1 = require("../db");
const convertId = (id) => new mongodb_1.ObjectId(id);
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, login, email } = user;
            const existUser = yield db_1.UserModel.findOne({ $or: [{ email: email }, { login: login }] });
            if (existUser) {
                return null;
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = new user_type_1.userDbType(new mongodb_1.ObjectId, login, email, new Date().toISOString(), hashPassword, salt, { code: "none", isConfirmed: true, expirationDate: new Date() });
            return user_repository_1.userRepository.createUser(newUser);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.userRepository.deleteUser(convertId(id));
        });
    }
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.userRepository.deleteAllUsers();
        });
    }
    recoverPassword(newPassword, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield crypto_service_1.cryptoService.genHash(newPassword);
            const userCode = yield query_recoveryPass_1.queryRecoverPass.checkCode(code);
            if (!userCode)
                return false;
            const user = yield query_UserRepository_1.QueryUserRepository.findUserById(convertId(userCode.userId));
            if (!user)
                return false;
            yield oldPassword_repository_1.oldPasswordRepo.savePassword(userCode.userId, user.hashPassword);
            const res = yield user_repository_1.userRepository.changePassword(hash.hash, convertId(userCode.userId), hash.salt);
            if (!res)
                return false;
            return true;
        });
    }
}
exports.userService = new UserService();
