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
exports.postLikeService = void 0;
const newestLike_repo_1 = require("../repositories/mutation/newestLike-repo");
const query_postLikeNewest_1 = require("../repositories/query/query-postLikeNewest");
exports.postLikeService = {
    addLikeToArray(userId, postId, status, login) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield query_postLikeNewest_1.queryLikePostNewestRepo.getExistLike(userId, postId);
            if (!exist) {
                yield newestLike_repo_1.newestLikeRepo.addLikeToArray(userId, postId, status, login);
                return;
            }
            yield newestLike_repo_1.newestLikeRepo.changeExist(userId, postId, status);
            return;
        });
    },
    updateLikeStatus(likeStatus, userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield newestLike_repo_1.newestLikeRepo.changeExist(userId, postId, likeStatus);
            return true;
        });
    }
};
