import { body, ValidationChain } from "express-validator";

// Define a validation schema for updating a movie.
export const updateMovieValidationSchema: ValidationChain[] = [
  // Validation for the "title" property in the request body (optional)
  body("title").optional(),

  // Validation for the "genre" property in the request body (optional)
  body("genre").optional(),

  // Validation for the "rating" property in the request body (optional)
  body("rating").optional(),

  // Validation for the "streamingLink" property in the request body (optional)
  body("streamingLink").optional(),
];
