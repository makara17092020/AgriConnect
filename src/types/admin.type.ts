export interface IAdmin {
  email: string;
  password: string;
  name: string;
}

export interface ILoginAdmin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
  };
}
