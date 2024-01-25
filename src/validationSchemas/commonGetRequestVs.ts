import { query, ValidationChain } from "express-validator";

export const commonGetValidationSchema: ValidationChain[] = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page should be a number"),
  query("limit").optional().isNumeric().withMessage("limit should be a number"),
  query("status")
    .optional()
    .isBoolean()
    .withMessage("status should be a boolean"),
  query("q").optional(),
];
