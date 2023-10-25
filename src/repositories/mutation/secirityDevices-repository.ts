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
    },
    async deactivateSession(deviceId: string):Promise<boolean>{
        const res = await securityDevicesCollection.updateOne(
            {deviceId: deviceId},
            {$set: {isActive: false}}
        )
        return res.modifiedCount === 1
    },
    async changeActiveDate(deviceId: string):Promise<boolean>{
        const res = await securityDevicesCollection.updateOne(
            {deviceId: deviceId},
            {$set: {lastActiveDate: new Date().toISOString()}}

        )
        return res.modifiedCount === 1
    },
    async deleteAllsessionBesideCurrent(deviceId: string, userId: string):Promise<boolean>{
        const res = await securityDevicesCollection.deleteMany(
            {userId: userId, deviceId: {$ne: deviceId}},
        )
        return res.deletedCount > 0
    },
    async deletAllData():Promise<boolean>{
        const res = await securityDevicesCollection.deleteMany({})
        return res.deletedCount > 0
    }
}