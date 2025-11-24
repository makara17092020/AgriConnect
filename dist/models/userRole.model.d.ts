import mongoose, { Document, Types } from "mongoose";
import { IRole } from "./role.model";
export interface IUserRole extends Document {
    userId: Types.ObjectId;
    roleId: Types.ObjectId | IRole;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const _default: mongoose.Model<IUserRole, {}, {}, {}, mongoose.Document<unknown, {}, IUserRole, {}, {}> & IUserRole & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=userRole.model.d.ts.map