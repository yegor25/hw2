import { userDbType } from "./user-type";

declare global {
    declare namespace Express {
        export interface Request {
            user: userDbType | null
        }
    }
}
