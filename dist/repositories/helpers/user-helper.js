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
    },
    convertArrayUser(users) {
        const res = users.map(el => ({
            id: el._id.toString(),
            login: el.login,
            email: el.email,
            createdAt: el.createdAt
        }));
        return res;
    }
};
