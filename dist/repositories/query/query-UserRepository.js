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
exports.QueryUserRepository = void 0;
const db_1 = require("../../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const paginator_helper_1 = require("../helpers/paginator-helper");
const user_helper_1 = require("../helpers/user-helper");
exports.QueryUserRepository = {
    checkUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.userCollection.findOne({ $or: [{ email: data.loginOrEmail }, { login: data.loginOrEmail }] });
            if (!user) {
                return null;
            }
            const hashedPassword = yield bcrypt_1.default.hash(data.password, user.passwordSalt);
            if (hashedPassword !== user.hashPassword) {
                return null;
            }
            return user;
        });
    },
    findUsers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametres = paginator_helper_1.paginatorHelper.usersParamsMapper(params);
            const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
            const users = yield db_1.userCollection.find({
                $or: [
                    { email: { $regex: parametres.searchEmailTerm, $options: "i" } },
                    { login: { $regex: parametres.searchLoginTerm, $options: "i" } }
                ]
            })
                .sort({ [parametres.sortBy]: parametres.sortDirection })
                .skip(skipCount)
                .limit(parametres.pageSize)
                .toArray();
            const totalCount = yield db_1.userCollection.countDocuments({
                $or: [
                    { email: { $regex: parametres.searchEmailTerm, $options: "i" } },
                    { login: { $regex: parametres.searchLoginTerm, $options: "i" } }
                ]
            });
            return {
                pagesCount: Math.ceil(totalCount / +parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
                totalCount,
                items: user_helper_1.userHelper.convertArrayUser(users)
            };
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.userCollection.findOne({ _id: id });
            return user;
        });
    },
    findUserByLoginOrEmail(val) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.userCollection.findOne({
                $or: [
                    { login: val },
                    { email: val }
                ]
            });
            if (user)
                return user;
            return null;
        });
    },
};
