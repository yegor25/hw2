import { ObjectId } from "mongodb";
import { securityDevicesDbType, securityDevicesInputType, securityDevicesViewType } from "../../types/securityDevices-type";
import {v4} from "uuid"

export const sessionsHelper = {
    sessionMapperForDb(data: securityDevicesInputType):securityDevicesDbType {
        const {ip,title, userId} = data
        const res:securityDevicesDbType = {
            _id: new ObjectId(),
            title,
            userId,
            ip,
            deviceId: v4(),
            lastActiveDate: new Date().toISOString()
        }
        return res
    },
    sessionViewMapper(data: securityDevicesDbType):securityDevicesViewType {
        const {ip, title, lastActiveDate, deviceId} = data
        const res:securityDevicesViewType = {
            ip,
            title,
            lastActiveDate,
            deviceId
        }
        return res
    },
    sesionsViewMapperArray(data: securityDevicesDbType[]):securityDevicesViewType[]{
        return data.map(el => this.sessionViewMapper(el))
    }
}