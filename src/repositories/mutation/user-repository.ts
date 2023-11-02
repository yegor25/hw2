import { ObjectId } from "mongodb";
import { userCollection } from "../../db";
import { userConfirmationType, userDbType, userInputType, userViewType } from "../../types/user-type";
import { userHelper } from "../helpers/user-helper";
import { isAfter } from "date-fns";
import { v4 } from "uuid";


export const userRepository = {
   async createUser(payload: userDbType): Promise<userViewType | null>{ 
    const newUser = await userCollection.insertOne(payload)
        return userHelper.convertUserDTO(payload)
   },
   async deleteUser(id: ObjectId):Promise<boolean> {
    const res = await userCollection.deleteOne({_id: id})
    return res.deletedCount === 1
   },
   async deleteAllUsers():Promise<boolean>{
    const res = await userCollection.deleteMany({})
    return res.deletedCount > 0
   },
   async checkCodeConfirmation(code: string):Promise<boolean>{
      const user = await userCollection.findOne({"emailConfirmation.code": code})
      if(!user) return false
      if(user.emailConfirmation.isConfirmed) return false
      if(user.emailConfirmation.expirationDate < new Date() ) return false
      const confirmedUser = await userCollection.updateOne(
          {_id: user._id},
          {$set: {"emailConfirmation.isConfirmed": true}}
      )
      return confirmedUser.modifiedCount === 1
  },
  async changeConfirmationData(email: string, data: userConfirmationType):Promise<string>{
   const newCode = v4()
   const user = await userCollection.updateOne(
      {email: email},
      {$set: {emailConfirmation: data}}
   )
   return data.code
  },
  async changePassword(hash: string, userId: ObjectId):Promise<boolean>{
    const newPass = await userCollection.updateOne(
        {_id: userId},
        {$set: {hashPassword: hash}}
    )
    return newPass.modifiedCount === 1
  }
}