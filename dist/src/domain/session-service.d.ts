declare class SessionService {
    deleteSession(deviceId: string): Promise<boolean>;
    deactivateSession(deviceId: string): Promise<boolean>;
    changectiveDate(deviceId: string): Promise<boolean>;
    deleteAllsessionsBesideCurrenr(deviceId: string, userId: string): Promise<boolean>;
    deleteAllsessions(): Promise<boolean>;
}
export declare const sessionService: SessionService;
export {};
