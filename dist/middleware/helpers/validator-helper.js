"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHelper = void 0;
exports.validatorHelper = {
    errorFormatter(error) {
        switch (error.type) {
            case "field":
                return { message: error.msg, field: error.path };
            default:
                return {
                    message: error.msg,
                    field: "none"
                };
        }
    }
};
