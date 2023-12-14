import mongoose from "mongoose";
export type oldPasswordType = {
    hashPassword: string;
    userId: string;
};
export declare const oldPasswordSchema: mongoose.Schema<oldPasswordType, mongoose.Model<oldPasswordType, any, any, any, mongoose.Document<unknown, any, oldPasswordType> & oldPasswordType & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, oldPasswordType, mongoose.Document<unknown, {}, mongoose.FlatRecord<oldPasswordType>> & mongoose.FlatRecord<oldPasswordType> & {
    _id: mongoose.Types.ObjectId;
}>;
