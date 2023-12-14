import { ObjectId } from "mongodb";
import { userConfirmationType, userDbType, userInputType, userViewType } from "../../types/user-type";
import { userHelper } from "../helpers/user-helper";
import { isAfter } from "date-fns";
import { v4 } from "uuid";
import { UserModel } from "../../db";


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


export class UserRepository {
  async createUser(payload: userDbType): Promise<userViewType | null>{ 
    const newUser = await UserModel.create(payload)
        return userHelper.convertUserDTO(payload)
   }
   async deleteUser(id: ObjectId):Promise<boolean> {
    const res = await UserModel.deleteOne({_id: id})
    return res.deletedCount === 1
   }
   async deleteAllUsers():Promise<boolean>{
    const res = await UserModel.deleteMany({})
    return res.deletedCount > 0
   }
   async checkCodeConfirmation(code: string):Promise<boolean>{
      const user = await UserModel.findOne({"emailConfirmation.code": code})
      if(!user) return false
      if(user.emailConfirmation.isConfirmed) return false
      if(user.emailConfirmation.expirationDate < new Date() ) return false
      const confirmedUser = await UserModel.updateOne(
          {_id: user._id},
          {$set: {"emailConfirmation.isConfirmed": true}}
      )
      return confirmedUser.modifiedCount === 1
  }
  async changeConfirmationData(email: string, data: userConfirmationType):Promise<string>{
   await UserModel.updateOne(
      {email: email},
      {$set: {emailConfirmation: data}}
   )
   return data.code
  }
  async changePassword(hash: string, userId: ObjectId, salt: string):Promise<boolean>{
    const newPass = await UserModel.updateOne(
        {_id: userId},
        {$set: {hashPassword: hash, passwordSalt: salt}}
    )
    return newPass.modifiedCount === 1
  }
}

