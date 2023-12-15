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
exports.newestLikeRepo = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../db");
exports.newestLikeRepo = {
    addLikeToArray(userId, postId, status, login) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = new db_1.LikePostsNewest({ userId: userId, postId: postId, addedAt: new Date(), status: status, _id: new mongodb_1.ObjectId(), login: login, isFirst: true });
            return newPost;
        });
    },
    changeExist(userId, postId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const postLike = yield db_1.LikePostsNewest.findOneAndUpdate({ userId: userId, postId: postId }, { $set: { addedAt: new Date(), isFirst: false, status: status } });
            return;
        });
    }
};
