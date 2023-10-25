import { securityDevicesCollection } from "../../db";
import { securityDevicesDbType } from "../../types/securityDevices-type";


export const securityDevicesRepository = {
     async saveSessions(data: securityDevicesDbType):Promise<securityDevicesDbType>{
        const res = await securityDevicesCollection.insertOne(data)
        return data
    },
}