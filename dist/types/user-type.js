"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbType = void 0;
class userDbType {
    constructor(_id, login, email, createdAt, hashPassword, passwordSalt, emailConfirmation) {
        this._id = _id;
        this.login = login;
        this.email = email;
        this.createdAt = createdAt;
        this.hashPassword = hashPassword;
        this.passwordSalt = passwordSalt;
        this.emailConfirmation = emailConfirmation;
    }
}
exports.userDbType = userDbType;
