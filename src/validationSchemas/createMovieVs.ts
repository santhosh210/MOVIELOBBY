import { body, ValidationChain } from "express-validator";
import Movie from "../models/Movie";

// Define a validation schema for creating a new movie.
export const createMovieValidationSchema: ValidationChain[] = [
  // Validation for the "title" property in the request body (should not be empty and must be unique)
  body("title")
    .notEmpty()
    .withMessage("Movie name is mandatory")
    .custom(async (name: string) => {
      // Check if a movie with the provided title already exists in the database
      const movie = await Movie.findOne({ title: name });

      // If movie with the same title exists, throw an error
      if (movie) {
        throw new Error("Movie title already exists");
      }

      // Return true if validation passes
      return true;
    }),

  // Validation for the "genre" property in the request body (optional)
  body("genre").optional(),

  // Validation for the "rating" property in the request body (optional)
  body("rating").optional(),

  // Validation for the "streamingLink" property in the request body (optional)
  body("streamingLink").optional(),
];
