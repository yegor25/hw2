import { securityDevicesDbType, securityDevicesInputType, securityDevicesViewType } from "../../types/securityDevices-type";
export declare const sessionsHelper: {
    sessionMapperForDb(data: securityDevicesInputType): securityDevicesDbType;
    sessionViewMapper(data: securityDevicesDbType): securityDevicesViewType;
    sesionsViewMapperArray(data: securityDevicesDbType[]): securityDevicesViewType[];
};
