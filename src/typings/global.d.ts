// custom.d.ts
import { Request } from "express";

declare module "express" {
  interface Request {
    user?: {
      name: string;
      role: string;
    };
  }
}

export interface req extends Request {
  user?: {
    name: string;
    role: string;
  };
}
export interface commonGetValidationSchema {
  limit: Number;
  skip: Number;
  q: String;
}
