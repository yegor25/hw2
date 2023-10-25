import { ObjectId } from "mongodb"



export type securityDevicesDbType = {
    _id: ObjectId,
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string,
    userId: string
}
export type securityDevicesViewType = {
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string
}
export type securityDevicesInputType = {
    ip: string,
    title: string,
    userId: string
}