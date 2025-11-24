import { Types } from "mongoose";
import { IRoleType } from "./role.type";
export interface IUserRoleType {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    roleId: IRoleType;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=userRole.type.d.ts.map