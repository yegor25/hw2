import { TokenDbType } from "../types/tokens-type";
import { userInputType } from "../types/user-type";
import { securityDevicesInputType, securityDevicesViewType } from "../types/securityDevices-type";
import { UserRepository } from "../repositories/mutation/user-repository";
export declare class AuthService {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    registerUser(data: userInputType): Promise<boolean>;
    confirmUser(code: string): Promise<boolean>;
    resendingEmail(email: string): Promise<string>;
    saveOldToken(token: string, userId: string): Promise<TokenDbType>;
    saveSession(data: securityDevicesInputType): Promise<securityDevicesViewType>;
    recoverPassword(email: string): Promise<boolean>;
}
