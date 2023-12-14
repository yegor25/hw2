import { TokenDbType } from "../../types/tokens-type";
declare class TokenRepository {
    saveToken(data: TokenDbType): Promise<TokenDbType>;
}
export declare const tokenRepository: TokenRepository;
export {};
