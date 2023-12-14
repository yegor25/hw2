import { userInputType, userViewType } from "../types/user-type";
import { UserRepository } from "../repositories/mutation/user-repository";
export declare class UserService {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    createUser(user: userInputType): Promise<userViewType | null>;
    deleteUser(id: string): Promise<boolean>;
    deleteAllUsers(): Promise<boolean>;
    recoverPassword(newPassword: string, code: string): Promise<boolean>;
}
