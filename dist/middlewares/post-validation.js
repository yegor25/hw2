"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidate = exports.postValidator = void 0;
const express_validator_1 = require("express-validator");
const blog_repository_1 = require("../repositories/blog-repository");
exports.postValidator = [
    (0, express_validator_1.body)("title").exists().isString().notEmpty().trim().isLength({ min: 3, max: 30 }).withMessage("invalid title"),
    (0, express_validator_1.body)("shortDescription").trim().notEmpty().isString().isLength({ min: 3, max: 100 }).withMessage("invalid short description"),
    (0, express_validator_1.body)("content").trim().notEmpty().isString().isLength({ min: 3, max: 1000 }).withMessage("invalid content"),
    (0, express_validator_1.body)("blogId").exists().trim().isString().notEmpty().withMessage("required valid blogId"),
    (0, express_validator_1.body)("blogId").custom(val => blog_repository_1.blogsRepository.findBlogById(val))
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
