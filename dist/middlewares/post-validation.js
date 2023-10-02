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
exports.postValidate = exports.postValidator = void 0;
const express_validator_1 = require("express-validator");
const blog_repository_1 = require("../repositories/blog-repository");
exports.postValidator = [
    (0, express_validator_1.body)("title").exists().isString().notEmpty().trim().isLength({ min: 3, max: 30 }).withMessage("invalid title"),
    (0, express_validator_1.body)("shortDescription").trim().notEmpty().isString().isLength({ min: 3, max: 100 }).withMessage("invalid short description"),
    (0, express_validator_1.body)("content").trim().notEmpty().isString().isLength({ min: 3, max: 1000 }).withMessage("invalid content"),
    // body("blogId").exists().trim().isString().notEmpty().custom( async (val) => await blogsRepository.findBlogById(val)).custom(val => ObjectId.isValid(val)).withMessage("required valid blogId"),
    (0, express_validator_1.body)("blogId").exists().isString().custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        yield blog_repository_1.blogsRepository.findBlogById(val)
            .then((res) => {
            if (!res)
                throw new Error("blogid");
        });
    })).withMessage("required valid blogId"),
];
const postValidate = (req, res, next) => {
    const errorFormatter = ({ msg, path }) => {
        return {
            message: msg,
            field: path
        };
    };
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }
    else {
        res.status(400).send({ errorsMessages: errors.array({ onlyFirstError: true }) });
        return;
    }
};
exports.postValidate = postValidate;
