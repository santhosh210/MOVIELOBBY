import { body, ValidationChain } from "express-validator";
import Movie from "../models/Movie";

export const createMovieValidationSchema: ValidationChain[] = [
  body("title")
    .notEmpty()
    .withMessage("Movie name is mandatory")
    .custom(async (name: string) => {
      const movie = await Movie.findOne({ title: name });
      console.log({ movie });
      if (movie) {
        throw new Error("Movie title already exists");
      }
      return true;
    }),
  body("genre").optional(),
  body("rating").optional(),
  body("streamingLink").optional(),
];
