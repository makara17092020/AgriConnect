import { IRegisterInput, ILoginInput, IAuthResponse } from "../types/auth.type";
export declare const registerUser: (data: IRegisterInput) => Promise<IAuthResponse>;
export declare const loginUser: (data: ILoginInput) => Promise<IAuthResponse>;
export declare const addRolesToUser: (userId: string, newRoles: string[]) => Promise<string[]>;
export declare const logoutUser: () => Promise<{
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map