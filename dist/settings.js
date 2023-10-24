"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blog_route_1 = require("./routes/blog-route");
const post_route_1 = require("./routes/post-route");
const testing_route_1 = require("./routes/testing-route");
const user_route_1 = require("./routes/user-route");
const auth_route_1 = require("./routes/auth-route");
const comments_route_1 = require("./routes/comments-route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use("/blogs", blog_route_1.blogRouter);
exports.app.use("/posts", post_route_1.postRouter);
exports.app.use("/users", user_route_1.userRouter);
exports.app.use("/auth", auth_route_1.authRouter);
exports.app.use("/comments", comments_route_1.commentRouter);
exports.app.use("/testing", testing_route_1.testingRouter);
exports.app.get("/", (req, res) => {
    res.send("this is second homework");
});
