import { securityDevicesCollection } from "../../db"
import {  securityDevicesViewType } from "../../types/securityDevices-type"
import { sessionsHelper } from "../helpers/sessions-helper"



export const sessionsQuery = {
    async getSession(deviceId: string):Promise<securityDevicesViewType | null>{
        const res = await securityDevicesCollection.findOne({deviceId: deviceId})
       if(res) return sessionsHelper.sessionViewMapper(res)
       return null
    },
    async getAllSessions(userId: string):Promise<securityDevicesViewType[] | null> {
        const res = await securityDevicesCollection.find({userId: userId}).toArray()
        if(!res) return null
        return sessionsHelper.sesionsViewMapperArray(res)
    }
}