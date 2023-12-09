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
exports.queryRecoverPass = void 0;
const PassRecovery_1 = require("../../types/db-schemas/PassRecovery");
// export const queryRecoverPass = {
//     async checkCode(code: string):Promise<passRecoveryDbType | null>{
//         const query = await PassRecoveryModel.findOne({recoveryCode: code})
//         return query
//     }
// }
class QueryRecoverPass {
    checkCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield PassRecovery_1.PassRecoveryModel.findOne({ recoveryCode: code });
            return query;
        });
    }
}
exports.queryRecoverPass = new QueryRecoverPass();
