// src/types/express.d.ts
import { IJwtPayload } from "./jwt.type";

declare global {
  namespace Express {
    export interface Request {
      user?: IJwtPayload;
    }
  }
}
