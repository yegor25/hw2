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
const db_1 = require("../db");
const user_repository_1 = require("../repositories/mutation/user-repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_service_1 = require("../application/crypto-service");
const query_recoveryPass_1 = require("../repositories/query/query-recoveryPass");
const convertId = (id) => new mongodb_1.ObjectId(id);
exports.userService = {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, login, email } = user;
            const existUser = yield db_1.userCollection.findOne({ $or: [{ email: email }, { login: login }] });
            if (existUser) {
                return null;
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = {
                _id: new mongodb_1.ObjectId(),
                login,
                email,
                createdAt: new Date().toISOString(),
                hashPassword,
                passwordSalt: salt,
                emailConfirmation: {
                    code: "none",
                    isConfirmed: true,
                    expirationDate: new Date()
                }
            };
            return user_repository_1.userRepository.createUser(newUser);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.userRepository.deleteUser(convertId(id));
        });
    },
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.userRepository.deleteAllUsers();
        });
    },
    recoverPassword(newPassword, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield crypto_service_1.cryptoService.genHash(newPassword);
            const user = yield query_recoveryPass_1.queryRecoverPass.checkCode(code);
            if (!user)
                return false;
            const res = yield user_repository_1.userRepository.changePassword(hash.hash, convertId(user.userId));
            if (!res)
                return false;
            return true;
        });
    }
};
