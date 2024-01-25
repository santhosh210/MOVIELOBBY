import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { req } from "../typings/global";

export class Requests {
  private req: req;
  private res: Response;
  private next: NextFunction;

  constructor(req: req, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  public static validationRequest(req: req, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (result.isEmpty()) next();
    else res.status(400).json({ message: result.array() });
  }
}
