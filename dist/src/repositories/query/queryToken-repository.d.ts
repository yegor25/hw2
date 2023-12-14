import { TokenDbType } from "../../types/tokens-type";
declare class queryTokenRepository {
    findToken(token: string): Promise<TokenDbType | null>;
}
export declare const QueryTokenRepository: queryTokenRepository;
export {};
