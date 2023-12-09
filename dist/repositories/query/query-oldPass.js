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
exports.queryOldPasswordRepo = void 0;
const db_1 = require("../../db");
// export const queryOldPasswordRepo = {
//     async getOldPassword(userId: string):Promise<oldPasswordType | null> {
//         const pass = await OldPassword.findOne({userId: userId})
//         return pass
//     }
// }
class QueryOldPasswordRepo {
    getOldPassword(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pass = yield db_1.OldPassword.findOne({ userId: userId });
            return pass;
        });
    }
}
exports.queryOldPasswordRepo = new QueryOldPasswordRepo();
