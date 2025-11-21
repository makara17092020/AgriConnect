// src/types/jwt.type.ts
export interface IJwtPayload {
  id: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}
