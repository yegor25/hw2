import { requestUserDbType } from "../../types/requestUserType";
declare class RequestUserRepository {
    saveRequest(data: requestUserDbType): Promise<requestUserDbType>;
}
export declare const requestUserRepository: RequestUserRepository;
export {};
