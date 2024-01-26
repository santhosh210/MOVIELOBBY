import * as jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { req } from "../typings/global";
import { unauthorized } from "../helpers/responses/errorResponse";
import dotenv from "dotenv";

dotenv.config();

/**
 * Middleware for verifying JWT tokens in the authorization header.
 * Decodes the token and attaches the user information to the request object.
 * @param {req} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
const verifyToken = async (req: req, res: Response, next: NextFunction) => {
  try {
    console.log("Inside token verification");

    // Get the secret key from the environment variables
    const secretKey =
      process.env.JWT_SECRET || "AIzaSyBtGuIOhOR6D1difgbeaPQtLtHYwwGe5wM";
    console.log({ secretKey });

    // Extract the token from the authorization header
    const authorization = req.headers.authorization;
    console.log({ auth: authorization, typeof: authorization });

    if (authorization) {
      console.log("Authorization header found");

      // Verify and decode the JWT token
      const decoded = jwt.verify(authorization, secretKey) as
        | { name: string; role: string }
        | undefined;

      console.log(decoded);

      if (!decoded) {
        // Token decoding failed
        return unauthorized(res, "Cannot decode token");
      }

      // Attach the decoded user information to the request object
      req.user = decoded;
      console.log({ req: req.user });

      // Continue to the next middleware or route handler
      next();
    } else {
      // Authorization header or token not found
      return unauthorized(res, "Token not found");
    }
  } catch (error) {
    // Handle errors during token verification
    console.error("Error verifying token:", error);
    return unauthorized(res, `Error while verifying token: ${error}`);
  }
};

// Export the middleware for use in other modules
export default verifyToken;
