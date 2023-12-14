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
exports.securityDevicesRepository = void 0;
const db_1 = require("../../db");
// export const securityDevicesRepository = {
//      async saveSessions(data: securityDevicesDbType):Promise<securityDevicesDbType>{
//         await SecurityDevicesModel.create(data)
//         return data
//     },
//     async deleteDeviceSession(deviceId: string):Promise<boolean>{
//         const res = await SecurityDevicesModel.deleteOne({deviceId: deviceId})
//         return res.deletedCount === 1
//     },
//     async deactivateSession(deviceId: string):Promise<boolean>{
//         const res = await SecurityDevicesModel.updateOne(
//             {deviceId: deviceId},
//             {$set: {isActive: false}}
//         )
//         return res.modifiedCount === 1
//     },
//     async changeActiveDate(deviceId: string):Promise<boolean>{
//         const res = await SecurityDevicesModel.updateOne(
//             {deviceId: deviceId},
//             {$set: {lastActiveDate: new Date().toISOString()}}
//         )
//         return res.modifiedCount === 1
//     },
//     async deleteAllsessionBesideCurrent(deviceId: string, userId: string):Promise<boolean>{
//         const res = await SecurityDevicesModel.deleteMany(
//             {userId: userId, deviceId: {$ne: deviceId}},
//         )
//         return res.deletedCount > 0
//     },
//     async deletAllData():Promise<boolean>{
//         const res = await SecurityDevicesModel.deleteMany({})
//         return res.deletedCount > 0
//     }
// }
class SecurityDevicesRepository {
    saveSessions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.SecurityDevicesModel.create(data);
            return data;
        });
    }
    deleteDeviceSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.deleteOne({ deviceId: deviceId });
            return res.deletedCount === 1;
        });
    }
    deactivateSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.updateOne({ deviceId: deviceId }, { $set: { isActive: false } });
            return res.modifiedCount === 1;
        });
    }
    changeActiveDate(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.updateOne({ deviceId: deviceId }, { $set: { lastActiveDate: new Date().toISOString() } });
            return res.modifiedCount === 1;
        });
    }
    deleteAllsessionBesideCurrent(deviceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.deleteMany({ userId: userId, deviceId: { $ne: deviceId } });
            return res.deletedCount > 0;
        });
    }
    deletAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.SecurityDevicesModel.deleteMany({});
            return res.deletedCount > 0;
        });
    }
}
exports.securityDevicesRepository = new SecurityDevicesRepository();
