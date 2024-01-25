import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { req } from "../typings/global";

export class Requests {
  constructor(req: req, res: Response, next: NextFunction) {}

  public static validationRequest(req: req, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (result.isEmpty()) next();
    else res.status(400).json({ message: result.array() });
  }
}
