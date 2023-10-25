import { securityDevicesCollection } from "../../db";
import { securityDevicesDbType } from "../../types/securityDevices-type";


export const securityDevicesRepository = {
     async saveSessions(data: securityDevicesDbType):Promise<securityDevicesDbType>{
        const res = await securityDevicesCollection.insertOne(data)
        return data
    },
    async deleteDeviceSession(deviceId: string):Promise<boolean>{
        const res = await securityDevicesCollection.deleteOne({deviceId: deviceId})
        return res.deletedCount === 1
    }
}