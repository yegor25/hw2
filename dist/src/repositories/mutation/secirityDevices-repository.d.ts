import { securityDevicesDbType } from "../../types/securityDevices-type";
declare class SecurityDevicesRepository {
    saveSessions(data: securityDevicesDbType): Promise<securityDevicesDbType>;
    deleteDeviceSession(deviceId: string): Promise<boolean>;
    deactivateSession(deviceId: string): Promise<boolean>;
    changeActiveDate(deviceId: string): Promise<boolean>;
    deleteAllsessionBesideCurrent(deviceId: string, userId: string): Promise<boolean>;
    deletAllData(): Promise<boolean>;
}
export declare const securityDevicesRepository: SecurityDevicesRepository;
export {};
