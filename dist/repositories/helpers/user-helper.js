"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHelper = void 0;
exports.userHelper = {
    convertUserDTO(user) {
        const res = {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        };
        return res;
    }
};
