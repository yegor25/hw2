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
exports.runDb = exports.LikePostsNewest = exports.LikeCommentsModel = exports.ReqUserModel = exports.SecurityDevicesModel = exports.TokenModel = exports.CommentsModel = exports.UserModel = exports.BlogModel = exports.OldPassword = exports.PostModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Post_1 = require("./types/db-schemas/Post");
const OldPasswors_1 = require("./types/db-schemas/OldPasswors");
const Comments_1 = require("./types/db-schemas/Comments");
const user_schema_1 = require("./types/db-schemas/user-schema");
const blog_schema_1 = require("./types/db-schemas/blog-schema");
const tokens_schema_1 = require("./types/db-schemas/tokens-schema");
const securityDevice_schema_1 = require("./types/db-schemas/securityDevice-schema");
const reqUser_schema_1 = require("./types/db-schemas/reqUser-schema");
const likePost_schema_1 = require("./types/db-schemas/likePost-schema");
dotenv_1.default.config();
const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
exports.PostModel = mongoose_1.default.model("posts", Post_1.postSchema);
exports.OldPassword = mongoose_1.default.model("oldPasswords", OldPasswors_1.oldPasswordSchema);
exports.BlogModel = mongoose_1.default.model('blogs', blog_schema_1.blogSchema);
exports.UserModel = mongoose_1.default.model('users', user_schema_1.userSchema);
exports.CommentsModel = mongoose_1.default.model('comments', Comments_1.commentsSchema);
exports.TokenModel = mongoose_1.default.model('tokens', tokens_schema_1.tokenSchema);
exports.SecurityDevicesModel = mongoose_1.default.model("securityDevices", securityDevice_schema_1.securityDeviceSchema);
exports.ReqUserModel = mongoose_1.default.model("requestUsers", reqUser_schema_1.reqUserSchema);
exports.LikeCommentsModel = mongoose_1.default.model("likeComments", Comments_1.commentsLikesInfoSchema);
exports.LikePostsNewest = mongoose_1.default.model("newestLikes", likePost_schema_1.likePostSchema);
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(url);
        console.log("db is connected");
    }
    catch (error) {
        console.log("err", error);
        console.log("database is disconnect");
        yield mongoose_1.default.disconnect();
    }
});
exports.runDb = runDb;
