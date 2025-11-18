// src/types/auth.type.ts

export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  phone?: string | undefined;
}

export interface IAuthResponse {
  token: string;
  user: IAuthUser;
}
