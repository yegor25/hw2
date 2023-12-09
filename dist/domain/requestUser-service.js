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
exports.requestUserService = void 0;
const mongodb_1 = require("mongodb");
const requestUser_repository_1 = require("../repositories/mutation/requestUser-repository");
// export const requestUserService = {
//     async saveRequestData(data: requestUserType):Promise<requestUserType>{
//         const res = await requestUserRepository.saveRequest({_id: new ObjectId(),...data})
//         return data
//     }
// }
class RequestUserService {
    saveRequestData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield requestUser_repository_1.requestUserRepository.saveRequest(Object.assign({ _id: new mongodb_1.ObjectId() }, data));
            return data;
        });
    }
}
exports.requestUserService = new RequestUserService();
