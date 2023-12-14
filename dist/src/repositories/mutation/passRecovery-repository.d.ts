import { passRecoveryDbType } from "../../types/user-type";
declare class PassRecoveryRepository {
    createPassRecoveryCode(data: passRecoveryDbType): Promise<string>;
}
export declare const passRecoveryRepository: PassRecoveryRepository;
export {};
