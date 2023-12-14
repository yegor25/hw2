import { userDbType, userViewType } from "../../types/user-type";
export declare const userHelper: {
    convertUserDTO(user: userDbType): userViewType;
    convertArrayUser(users: userDbType[]): userViewType[];
};
