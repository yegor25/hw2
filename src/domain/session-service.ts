import { securityDevicesRepository } from "../repositories/mutation/secirityDevices-repository"



export const sessionService = {
    async deleteSession(deviceId: string):Promise<boolean>{
        return securityDevicesRepository.deleteDeviceSession(deviceId)
    },
    async deactivateSession(deviceId: string):Promise<boolean>{
        return  securityDevicesRepository.deactivateSession(deviceId)
        
    }
}