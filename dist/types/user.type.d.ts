import { Types } from "mongoose";
export interface IUserType {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=user.type.d.ts.map