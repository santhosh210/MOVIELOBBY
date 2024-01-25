import { body, ValidationChain } from "express-validator";

export const updateMovieValidationSchema: ValidationChain[] = [
  body("title").optional(),
  body("genre").optional(),
  body("rating").optional(),
  body("streamingLink").optional(),
];
