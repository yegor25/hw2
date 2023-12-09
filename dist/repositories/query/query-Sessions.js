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
exports.sessionsQuery = void 0;
const db_1 = require("../../db");
const sessions_helper_1 = require("../helpers/sessions-helper");
// export const sessionsQuery = {
//     async getSession(deviceId: string):Promise<securityDevicesViewType | null>{
//         const res = await SecurityDevicesModel.findOne({deviceId: deviceId})
//        if(res) return sessionsHelper.sessionViewMapper(res)
//        return null
//     },
//     async getAllSessions(userId: string):Promise<securityDevicesViewType[] | null> {
//         const res = await SecurityDevicesModel.find({userId: userId, isActive: true}).lean()
//         if(!res) return null
//         return sessionsHelper.sesionsViewMapperArray(res)
//     },
//     async checkUserSession(deviceId: string):Promise<securityDevicesDbType | null>{
//         const res = await SecurityDevicesModel.findOne({deviceId: deviceId})
//         return res
//     },
//     async checkSession(data: securityDevicesInputType):Promise<string | null>{
//         const res = await SecurityDevicesModel.findOne({userId: data.userId, title:data.title, ip: data.ip})
//         if(!res) return null
//         return res.deviceId
//     }
// }
class SessionsQuery {
    getSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.findOne({ deviceId: deviceId });
            if (res)
                return sessions_helper_1.sessionsHelper.sessionViewMapper(res);
            return null;
        });
    }
    getAllSessions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.find({ userId: userId, isActive: true }).lean();
            if (!res)
                return null;
            return sessions_helper_1.sessionsHelper.sesionsViewMapperArray(res);
        });
    }
    checkUserSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.findOne({ deviceId: deviceId });
            return res;
        });
    }
    checkSession(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.findOne({ userId: data.userId, title: data.title, ip: data.ip });
            if (!res)
                return null;
            return res.deviceId;
        });
    }
}
exports.sessionsQuery = new SessionsQuery();
