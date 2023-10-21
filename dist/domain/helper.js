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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = void 0;
const mongodb_1 = require("mongodb");
const crypto_service_1 = require("../application/crypto-service");
const uuid_1 = __importDefault(require("uuid"));
const date_fns_1 = require("date-fns");
exports.helper = {
    userDbViewMapper(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordData = yield crypto_service_1.cryptoService.genHash(user.password);
            const res = {
                _id: new mongodb_1.ObjectId(),
                email: user.email,
                login: user.login,
                createdAt: new Date().toISOString(),
                emailConfirmation: {
                    code: uuid_1.default.v4(),
                    expirationDate: (0, date_fns_1.addDays)(new Date, 1).toISOString(),
                    isConfirmed: false
                },
                hashPassword: passwordData.hash,
                passwordSalt: passwordData.salt
            };
            return res;
        });
    }
};
