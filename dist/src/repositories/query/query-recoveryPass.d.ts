import { passRecoveryDbType } from "../../types/user-type";
declare class QueryRecoverPass {
    checkCode(code: string): Promise<passRecoveryDbType | null>;
}
export declare const queryRecoverPass: QueryRecoverPass;
export {};
