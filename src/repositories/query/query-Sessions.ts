import { SecurityDevicesModel } from "../../db"
import {  securityDevicesDbType, securityDevicesInputType, securityDevicesViewType } from "../../types/securityDevices-type"
import { sessionsHelper } from "../helpers/sessions-helper"



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
    async getSession(deviceId: string):Promise<securityDevicesViewType | null>{
        const res = await SecurityDevicesModel.findOne({deviceId: deviceId})
       if(res) return sessionsHelper.sessionViewMapper(res)
       return null
    }
    async getAllSessions(userId: string):Promise<securityDevicesViewType[] | null> {
        const res = await SecurityDevicesModel.find({userId: userId, isActive: true}).lean()
        if(!res) return null
        return sessionsHelper.sesionsViewMapperArray(res)
    }
    async checkUserSession(deviceId: string):Promise<securityDevicesDbType | null>{
        const res = await SecurityDevicesModel.findOne({deviceId: deviceId})
        return res
    }
    async checkSession(data: securityDevicesInputType):Promise<string | null>{
        const res = await SecurityDevicesModel.findOne({userId: data.userId, title:data.title, ip: data.ip})
        if(!res) return null
        return res.deviceId
    }
}

export const sessionsQuery = new SessionsQuery()