import express from "express";
import * as moviesController from "../controllers/movies";
import verifyToken from "../middlewares/authMiddleware";
import { generateToken } from "../middlewares/generateToken";
import { response200 } from "../helpers/responses/sucessResponse";
import { internalServerResponse } from "../helpers/responses/serverErrorResponse";
import { Requests } from "../middlewares/validateRequest";
import { commonGetValidationSchema } from "../validationSchemas/commonGetRequestVs";
import { commonMovieByIdValidationSchema } from "../validationSchemas/commonMovieByIdVs";
import { createMovieValidationSchema } from "../validationSchemas/createMovieVs";
import { updateMovieValidationSchema } from "../validationSchemas/updateMovieVs";

const router = express.Router();

// Route to create a user with a generated token
router.post("/createUser", async (req, res) => {
  try {
    const { name, role } = req.body;
    const token = await generateToken(name, role);
    return response200(res, token);
  } catch (error) {
    return internalServerResponse(res, error);
  }
});

// Route to get all movies with token verification and request validation
router.get(
  "/getAllMovies",
  verifyToken,
  commonGetValidationSchema,
  Requests.validationRequest,
  moviesController.getMovies
);

// Route to get a specific movie by ID with token verification and request validation
router.get(
  "/getMovieById/:movieId",
  verifyToken,
  commonMovieByIdValidationSchema,
  Requests.validationRequest,
  moviesController.getMovieById
);

// Route to add a new movie with token verification and request validation
router.post(
  "/addMovie",
  verifyToken,
  createMovieValidationSchema,
  Requests.validationRequest,
  moviesController.addMovie
);

// Route to update a movie by ID with token verification, request validation, and update validation
router.put(
  "/updateMovie/:movieId",
  verifyToken,
  commonMovieByIdValidationSchema,
  updateMovieValidationSchema,
  Requests.validationRequest,
  moviesController.updateMovie
);

// Route to delete a movie by ID with token verification and request validation
router.delete(
  "/deleteMovie/:movieId",
  verifyToken,
  commonMovieByIdValidationSchema,
  Requests.validationRequest,
  moviesController.deleteMovie
);

export default router;
