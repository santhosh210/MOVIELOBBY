// custom.d.ts

import { Request } from "express";

// Augment the Request interface in the "express" module to include a "user" property.
declare module "express" {
  interface Request {
    user?: {
      name: string;
      role: string;
    };
  }
}

// Define a custom interface "req" that extends the Request interface and includes a "user" property.
export interface req extends Request {
  user?: {
    name: string;
    role: string;
  };
}

// Define a custom interface "commonGetValidationSchema" for common query parameters in a GET request.
export interface commonGetValidationSchema {
  limit: Number; // The maximum number of items to return
  skip: Number; // The number of items to skip from the beginning
  q: String; // The search query parameter
}
