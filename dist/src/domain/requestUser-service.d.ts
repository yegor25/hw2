import { requestUserType } from "../types/requestUserType";
declare class RequestUserService {
    saveRequestData(data: requestUserType): Promise<requestUserType>;
}
export declare const requestUserService: RequestUserService;
export {};
