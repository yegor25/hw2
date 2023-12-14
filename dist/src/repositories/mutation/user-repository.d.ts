import { ObjectId } from "mongodb";
import { userConfirmationType, userDbType, userViewType } from "../../types/user-type";
export declare class UserRepository {
    createUser(payload: userDbType): Promise<userViewType | null>;
    deleteUser(id: ObjectId): Promise<boolean>;
    deleteAllUsers(): Promise<boolean>;
    checkCodeConfirmation(code: string): Promise<boolean>;
    changeConfirmationData(email: string, data: userConfirmationType): Promise<string>;
    changePassword(hash: string, userId: ObjectId, salt: string): Promise<boolean>;
}
