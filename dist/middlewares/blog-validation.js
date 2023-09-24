"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidate = exports.validateBlogShema = void 0;
const express_validator_1 = require("express-validator");
exports.validateBlogShema = [
    (0, express_validator_1.body)("name").exists().isString().notEmpty().trim().isLength({ min: 3, max: 15 }).withMessage("invalid name"),
    (0, express_validator_1.body)("description").trim().notEmpty().isString().isLength({ min: 3, max: 500 }).withMessage("invalid description"),
    (0, express_validator_1.body)("websiteUrl").trim().isString().notEmpty().isLength({ max: 100 }).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/, "g").withMessage("invalid url")
];
const blogValidate = (req, res, next) => {
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
exports.blogValidate = blogValidate;
