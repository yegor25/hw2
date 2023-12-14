import { securityDevicesDbType, securityDevicesInputType, securityDevicesViewType } from "../../types/securityDevices-type";
declare class SessionsQuery {
    getSession(deviceId: string): Promise<securityDevicesViewType | null>;
    getAllSessions(userId: string): Promise<securityDevicesViewType[] | null>;
    checkUserSession(deviceId: string): Promise<securityDevicesDbType | null>;
    checkSession(data: securityDevicesInputType): Promise<string | null>;
}
export declare const sessionsQuery: SessionsQuery;
export {};
