import * as jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { req } from "../typings/global";
import { unauthorized } from "../helpers/responses/errorResponse";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = async (req: req, res: Response, next: NextFunction) => {
  try {
    console.log("inside token");
    const secretKey = "AIzaSyBtGuIOhOR6D1difgbeaPQtLtHYwwGe5wM";
    const authorization = req.headers.authorization;

    if (authorization) {
      const decoded = jwt.verify(authorization, secretKey) as
        | { name: string; role: string }
        | undefined;

      if (!decoded) {
        return unauthorized(res, "Cannot decode token");
      }

      req.user = decoded;
      console.log({ req: req.user });
      next();
    } else {
      return unauthorized(res, "Token not found");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return unauthorized(res, `Error while verifying token: ${error}`);
  }
};

export default verifyToken;
