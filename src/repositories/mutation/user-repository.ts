import { ObjectId } from "mongodb";
import { userCollection } from "../../db";
import { userDbType, userInputType, userViewType } from "../../types/user-type";
import { userHelper } from "../helpers/user-helper";


export const userRepository = {
   async createUser(payload: userDbType): Promise<userViewType | null>{ 
    const newUser = await userCollection.insertOne(payload)
        return userHelper.convertUserDTO(payload)
   },
   async deleteAllUsers():Promise<boolean>{
    const res = await userCollection.deleteMany({})
    return res.deletedCount > 0
   }
}