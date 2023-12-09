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
exports.userRepository = void 0;
const user_helper_1 = require("../helpers/user-helper");
const db_1 = require("../../db");
// export const userRepository = {
//    async createUser(payload: userDbType): Promise<userViewType | null>{ 
//     const newUser = await UserModel.create(payload)
//         return userHelper.convertUserDTO(payload)
//    },
//    async deleteUser(id: ObjectId):Promise<boolean> {
//     const res = await UserModel.deleteOne({_id: id})
//     return res.deletedCount === 1
//    },
//    async deleteAllUsers():Promise<boolean>{
//     const res = await UserModel.deleteMany({})
//     return res.deletedCount > 0
//    },
//    async checkCodeConfirmation(code: string):Promise<boolean>{
//       const user = await UserModel.findOne({"emailConfirmation.code": code})
//       if(!user) return false
//       if(user.emailConfirmation.isConfirmed) return false
//       if(user.emailConfirmation.expirationDate < new Date() ) return false
//       const confirmedUser = await UserModel.updateOne(
//           {_id: user._id},
//           {$set: {"emailConfirmation.isConfirmed": true}}
//       )
//       return confirmedUser.modifiedCount === 1
//   },
//   async changeConfirmationData(email: string, data: userConfirmationType):Promise<string>{
//    await UserModel.updateOne(
//       {email: email},
//       {$set: {emailConfirmation: data}}
//    )
//    return data.code
//   },
//   async changePassword(hash: string, userId: ObjectId, salt: string):Promise<boolean>{
//     const newPass = await UserModel.updateOne(
//         {_id: userId},
//         {$set: {hashPassword: hash, passwordSalt: salt}}
//     )
//     return newPass.modifiedCount === 1
//   }
// }
class UserRepository {
    createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield db_1.UserModel.create(payload);
            return user_helper_1.userHelper.convertUserDTO(payload);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.UserModel.deleteOne({ _id: id });
            return res.deletedCount === 1;
        });
    }
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.UserModel.deleteMany({});
            return res.deletedCount > 0;
        });
    }
    checkCodeConfirmation(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.UserModel.findOne({ "emailConfirmation.code": code });
            if (!user)
                return false;
            if (user.emailConfirmation.isConfirmed)
                return false;
            if (user.emailConfirmation.expirationDate < new Date())
                return false;
            const confirmedUser = yield db_1.UserModel.updateOne({ _id: user._id }, { $set: { "emailConfirmation.isConfirmed": true } });
            return confirmedUser.modifiedCount === 1;
        });
    }
    changeConfirmationData(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.UserModel.updateOne({ email: email }, { $set: { emailConfirmation: data } });
            return data.code;
        });
    }
    changePassword(hash, userId, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPass = yield db_1.UserModel.updateOne({ _id: userId }, { $set: { hashPassword: hash, passwordSalt: salt } });
            return newPass.modifiedCount === 1;
        });
    }
}
exports.userRepository = new UserRepository();
