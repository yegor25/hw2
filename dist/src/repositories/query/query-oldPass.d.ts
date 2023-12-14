import { oldPasswordType } from "../../types/db-schemas/OldPasswors";
declare class QueryOldPasswordRepo {
    getOldPassword(userId: string): Promise<oldPasswordType | null>;
}
export declare const queryOldPasswordRepo: QueryOldPasswordRepo;
export {};
