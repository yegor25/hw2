import { ObjectId } from "mongodb";
import { userDbType } from "../types/user-type";
import jwt from "jsonwebtoken";
declare class JWTservice {
    createAccesToken(user: userDbType): Promise<string>;
    createRefreshToken(user: userDbType, deviceId: string): Promise<string>;
    checkRefreshToken(token: string): Promise<string | jwt.JwtPayload | null>;
    getUserIdByToken(token: string): Promise<ObjectId | null>;
}
export declare const jwtService: JWTservice;
export {};
