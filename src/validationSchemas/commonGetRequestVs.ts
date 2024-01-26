import { query, ValidationChain } from "express-validator";

// Define a validation schema for common query parameters in a GET request.
export const commonGetValidationSchema: ValidationChain[] = [
  // Validation for the "page" query parameter (optional, should be a positive integer)
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page should be a number greater than or equal to 1"),

  // Validation for the "limit" query parameter (optional, should be a numeric value)
  query("limit").optional().isNumeric().withMessage("limit should be a number"),

  // Validation for the "status" query parameter (optional, should be a boolean)
  query("status")
    .optional()
    .isBoolean()
    .withMessage("status should be a boolean"),

  // Validation for the "q" query parameter (optional, no specific validation)
  query("q").optional(),
];
