import { param, ValidationChain } from "express-validator";
import Movie from "../models/Movie";
export const commonMovieByIdValidationSchema: ValidationChain[] = [
  param("movieId")
    .notEmpty()
    .withMessage("Movie Id is mandatory")
    .custom(async (id) => {
      const movie = await Movie.findOne({ _id: id });
      if (!movie) {
        throw new Error("Movie not found!");
      }
      return true;
    }),
];
