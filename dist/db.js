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
exports.runDb = exports.requestUserCollections = exports.securityDevicesCollection = exports.tokensCollection = exports.commentsCollection = exports.userCollection = exports.blogCollection = exports.OldPassword = exports.PostModel = exports.db = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Post_1 = require("./types/models/Post");
const OldPasswors_1 = require("./types/models/OldPasswors");
dotenv_1.default.config();
const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
const dbName = "my-db";
const client = new mongodb_1.MongoClient(url);
exports.db = client.db(dbName);
exports.PostModel = mongoose_1.default.model("posts", Post_1.postSchema);
exports.OldPassword = mongoose_1.default.model("oldPasswords", OldPasswors_1.oldPasswordSchema);
exports.blogCollection = exports.db.collection('blogs');
exports.userCollection = exports.db.collection('users');
exports.commentsCollection = exports.db.collection('comments');
exports.tokensCollection = exports.db.collection('tokens');
exports.securityDevicesCollection = exports.db.collection("securityDevices");
exports.requestUserCollections = exports.db.collection("requestUsers");
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
