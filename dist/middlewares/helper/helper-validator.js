"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helperValidator = void 0;
exports.helperValidator = {
    errorFomatter(error) {
        switch (error.type) {
            case "field":
                return {
                    message: error.msg,
                    field: error.path
                };
            default:
                return {
                    message: error.msg,
                    field: "none"
                };
        }
    }
};
