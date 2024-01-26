import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { req } from "../typings/global";

/**
 * Class containing static methods related to handling HTTP requests.
 */
export class Requests {
  /**
   * Middleware to handle validation results from express-validator.
   * Checks if there are validation errors and responds accordingly.
   * @param {req} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next function.
   */
  public static validationRequest(req: req, res: Response, next: NextFunction) {
    // Get the validation results from the request
    const result = validationResult(req);

    // Check if there are no validation errors
    if (result.isEmpty()) {
      // Continue to the next middleware or route handler
      next();
    } else {
      // Respond with a 400 Bad Request status and the validation error messages
      res.status(400).json({ message: result.array() });
    }
  }
}
