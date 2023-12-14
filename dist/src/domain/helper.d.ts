import { passRecoveryDbType, userConfirmationType, userDbType, userInputType } from "../types/user-type";
declare class Helper {
    userDbViewMapper(user: userInputType): Promise<userDbType>;
    confiramtionDataMapper(): userConfirmationType;
    recoverPassDataMapper(userId: string): passRecoveryDbType;
}
export declare const helper: Helper;
export {};
