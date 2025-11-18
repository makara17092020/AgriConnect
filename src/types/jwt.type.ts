// src/types/jwt.type.ts
export interface IJwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
