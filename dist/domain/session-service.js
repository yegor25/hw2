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
exports.sessionService = void 0;
const secirityDevices_repository_1 = require("../repositories/mutation/secirityDevices-repository");
// export const sessionService = {
//     async deleteSession(deviceId: string):Promise<boolean>{
//         return securityDevicesRepository.deleteDeviceSession(deviceId)
//     },
//     async deactivateSession(deviceId: string):Promise<boolean>{
//         return  securityDevicesRepository.deactivateSession(deviceId)
//     },
//     async changectiveDate(deviceId: string):Promise<boolean>{
//         return securityDevicesRepository.changeActiveDate(deviceId)
//     },
//     async deleteAllsessionsBesideCurrenr(deviceId: string, userId: string):Promise<boolean>{
//         return securityDevicesRepository.deleteAllsessionBesideCurrent(deviceId, userId)
//     },
//     async deleteAllsessions(){
//         return securityDevicesRepository.deletAllData()
//     }
// }
class SessionService {
    deleteSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return secirityDevices_repository_1.securityDevicesRepository.deleteDeviceSession(deviceId);
        });
    }
    deactivateSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return secirityDevices_repository_1.securityDevicesRepository.deactivateSession(deviceId);
        });
    }
    changectiveDate(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return secirityDevices_repository_1.securityDevicesRepository.changeActiveDate(deviceId);
        });
    }
    deleteAllsessionsBesideCurrenr(deviceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return secirityDevices_repository_1.securityDevicesRepository.deleteAllsessionBesideCurrent(deviceId, userId);
        });
    }
    deleteAllsessions() {
        return __awaiter(this, void 0, void 0, function* () {
            return secirityDevices_repository_1.securityDevicesRepository.deletAllData();
        });
    }
}
exports.sessionService = new SessionService();
