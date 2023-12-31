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
exports.jwtService = void 0;
const mongodb_1 = require("mongodb");
const configuration_1 = require("../configuration");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const jwtService = {
//     async createAccesToken(user: userDbType) {
//         const token = jwt.sign({ userId: user._id}, configuration.ACCESS_SECRET, { expiresIn: '10m' })
//         return token
//     },
//     async createRefreshToken(user: userDbType, deviceId: string){
//         const token = jwt.sign(
//             {userId: user._id, deviceId},
//             configuration.REFRESH_SECRET,
//             {expiresIn: "30m"}
//         )
//         return token
//     },
//     async checkRefreshToken(token: string){
//         try {
//             const isValid = jwt.verify(token, configuration.REFRESH_SECRET)
//             return isValid
//         } catch (error) {
//             return null
//         }
//     },
//     async getUserIdByToken(token: string) {
//         try {
//             const result: any = jwt.verify(token, configuration.ACCESS_SECRET)
//             return new ObjectId(result.userId)
//         } catch (error) {
//             return null
//         }
//     }
// }
class JWTservice {
    createAccesToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, configuration_1.configuration.ACCESS_SECRET, { expiresIn: '10m' });
            return token;
        });
    }
    createRefreshToken(user, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId: user._id, deviceId }, configuration_1.configuration.REFRESH_SECRET, { expiresIn: "30m" });
            return token;
        });
    }
    checkRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValid = jsonwebtoken_1.default.verify(token, configuration_1.configuration.REFRESH_SECRET);
                return isValid;
            }
            catch (error) {
                return null;
            }
        });
    }
    getUserIdByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, configuration_1.configuration.ACCESS_SECRET);
                return new mongodb_1.ObjectId(result.userId);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.jwtService = new JWTservice();
