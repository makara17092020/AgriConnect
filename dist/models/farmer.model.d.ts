import mongoose, { Document } from "mongoose";
export interface IFarmer extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    name: string;
    email: string;
}
declare const _default: mongoose.Model<IFarmer, {}, {}, {}, mongoose.Document<unknown, {}, IFarmer, {}, {}> & IFarmer & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=farmer.model.d.ts.map