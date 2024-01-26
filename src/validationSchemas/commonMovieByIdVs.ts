import { param, ValidationChain } from "express-validator";
import Movie from "../models/Movie";

// Define a validation schema for validating movie by ID in route parameters.
export const commonMovieByIdValidationSchema: ValidationChain[] = [
  // Validation for the "movieId" parameter (should not be empty and must exist in the database)
  param("movieId")
    .notEmpty()
    .withMessage("Movie Id is mandatory")
    .custom(async (id) => {
      // Check if the movie with the provided ID exists in the database
      const movie = await Movie.findOne({ _id: id });

      // If movie not found, throw an error
      if (!movie) {
        throw new Error("Movie not found!");
      }

      // Return true if validation passes
      return true;
    }),
];
