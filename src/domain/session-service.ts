import { securityDevicesRepository } from "../repositories/mutation/secirityDevices-repository"



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
    async deleteSession(deviceId: string):Promise<boolean>{
        return securityDevicesRepository.deleteDeviceSession(deviceId)
    }
    async deactivateSession(deviceId: string):Promise<boolean>{
        return  securityDevicesRepository.deactivateSession(deviceId)
        
    }
    async changectiveDate(deviceId: string):Promise<boolean>{
        return securityDevicesRepository.changeActiveDate(deviceId)
    }
    async deleteAllsessionsBesideCurrenr(deviceId: string, userId: string):Promise<boolean>{
        return securityDevicesRepository.deleteAllsessionBesideCurrent(deviceId, userId)
    }
    async deleteAllsessions(){
        return securityDevicesRepository.deletAllData()
    }
}

export const sessionService = new SessionService()