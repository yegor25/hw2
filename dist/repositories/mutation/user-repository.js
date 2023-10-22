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
exports.userRepository = void 0;
const db_1 = require("../../db");
const user_helper_1 = require("../helpers/user-helper");
const uuid_1 = require("uuid");
exports.userRepository = {
    createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield db_1.userCollection.insertOne(payload);
            return user_helper_1.userHelper.convertUserDTO(payload);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.userCollection.deleteOne({ _id: id });
            return res.deletedCount === 1;
        });
    },
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.userCollection.deleteMany({});
            return res.deletedCount > 0;
        });
    },
    checkCodeConfirmation(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.userCollection.findOne({ "emailConfirmation.code": code });
            if (!user)
                return false;
            if (user.emailConfirmation.isConfirmed)
                return false;
            if (user.emailConfirmation.expirationDate < new Date())
                return false;
            const confirmedUser = yield db_1.userCollection.updateOne({ _id: user._id }, { $set: { "emailConfirmation.isConfirmed": true } }
            //  {$set: {emailConfirmation: {code: code, expirationDate: user.emailConfirmation.expirationDate, isConfirmed: true}}}
            );
            return confirmedUser.modifiedCount === 1;
        });
    },
    changeConfirmationData(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCode = (0, uuid_1.v4)();
            const user = yield db_1.userCollection.updateOne({ email: email }, { $set: { emailConfirmation: data } });
            return data.code;
        });
    }
};
