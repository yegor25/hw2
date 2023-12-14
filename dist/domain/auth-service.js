"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mongodb_1 = require("mongodb");
const mail_manager_1 = require("../managers/mail-manager");
const helper_1 = require("./helper");
const token_repository_1 = require("../repositories/mutation/token-repository");
const secirityDevices_repository_1 = require("../repositories/mutation/secirityDevices-repository");
const sessions_helper_1 = require("../repositories/helpers/sessions-helper");
const query_UserRepository_1 = require("../repositories/query/query-UserRepository");
const passRecovery_repository_1 = require("../repositories/mutation/passRecovery-repository");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, login } = data;
            const newUser = yield helper_1.helper.userDbViewMapper(data);
            const res = yield this.userRepository.createUser(newUser);
            const message = yield mail_manager_1.mailManager.registerConfirmation(email, newUser.emailConfirmation.code);
            return true;
        });
    }
    confirmUser(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.userRepository.checkCodeConfirmation(code);
            return res;
        });
    }
    resendingEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = yield this.userRepository.changeConfirmationData(email, helper_1.helper.confiramtionDataMapper());
            const message = yield mail_manager_1.mailManager.registerConfirmation(email, code);
            return code;
        });
    }
    saveOldToken(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                _id: new mongodb_1.ObjectId(),
                token,
                userId
            };
            return yield token_repository_1.tokenRepository.saveToken(data);
        });
    }
    saveSession(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield secirityDevices_repository_1.securityDevicesRepository.saveSessions(sessions_helper_1.sessionsHelper.sessionMapperForDb(data));
            return sessions_helper_1.sessionsHelper.sessionViewMapper(res);
        });
    }
    recoverPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield query_UserRepository_1.QueryUserRepository.findUserByLoginOrEmail(email);
            if (!user)
                return true;
            const data = helper_1.helper.recoverPassDataMapper(user._id.toString());
            const dataForRecovery = yield passRecovery_repository_1.passRecoveryRepository.createPassRecoveryCode(data);
            yield mail_manager_1.mailManager.passRecovery(email, dataForRecovery);
            return true;
        });
    }
}
exports.AuthService = AuthService;
// export const authService = {
//     async registerUser(data: userInputType):Promise<boolean>{
//         const {email, login} = data
//         const newUser = await helper.userDbViewMapper(data)
//         const res = await userRepository.createUser(newUser)
//         const message = await mailManager.registerConfirmation(email, newUser.emailConfirmation.code)
//         return true
//     },
//     async confirmUser(code: string):Promise<boolean>{
//         const res = await userRepository.checkCodeConfirmation(code)
//         return res
//     },
//     async resendingEmail(email: string): Promise<string>{
//         const code = await userRepository.changeConfirmationData(email, helper.confiramtionDataMapper())
//         const message = await mailManager.registerConfirmation(email,code)
//         return code
//     },
//     async saveOldToken(token: string, userId: string): Promise<TokenDbType>{
//         const data: TokenDbType = {
//             _id: new ObjectId(),
//             token, 
//             userId
//         }
//         return await tokenRepository.saveToken(data)
//     },
//     async saveSession(data: securityDevicesInputType):Promise<securityDevicesViewType>{
//         const res = await securityDevicesRepository.saveSessions(sessionsHelper.sessionMapperForDb(data))
//         return sessionsHelper.sessionViewMapper(res)
//     },
//     async recoverPassword(email: string):Promise<boolean>{
//         const user = await QueryUserRepository.findUserByLoginOrEmail(email)
//         if(!user) return true
//         const data = helper.recoverPassDataMapper(user._id.toString())
//         const dataForRecovery = await passRecoveryRepository.createPassRecoveryCode(data)
//         await mailManager.passRecovery(email, dataForRecovery)
//         return true
//     }
// }
