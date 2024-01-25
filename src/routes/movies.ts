import { body } from "express-validator";
import express, { Request, Response } from "express";
import * as moviesController from "../controllers/movies";
import verifyToken from "../middlewares/authMiddleware";
import { generateToken } from "../middlewares/generateToken";
import { response200 } from "../helpers/responses/sucessResponse";
import { internalServerResponse } from "../helpers/responses/serverErrorResponse";
import { req } from "../typings/global";
import { Requests } from "../middlewares/validateRequest";
import { commonGetValidationSchema } from "../validationSchemas/commonGetRequestVs";
import { commonMovieByIdValidationSchema } from "../validationSchemas/commonMovieByIdVs";
import { createMovieValidationSchema } from "../validationSchemas/createMovieVs";
import { updateMovieValidationSchema } from "../validationSchemas/updateMovieVs";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  commonGetValidationSchema,
  Requests.validationRequest,
  moviesController.getMovies
);

router.post(
  "/",
  verifyToken,
  createMovieValidationSchema,
  Requests.validationRequest,
  moviesController.addMovie
);

router.put(
  "/updateMovieById/:movieId",
  verifyToken,
  commonMovieByIdValidationSchema,
  updateMovieValidationSchema,
  Requests.validationRequest,
  moviesController.updateMovie
);

router.delete(
  "/:movieId",
  verifyToken,
  commonMovieByIdValidationSchema,
  Requests.validationRequest,
  moviesController.deleteMovie
);
router.get(
  "/:movieId",
  verifyToken,
  commonMovieByIdValidationSchema,
  Requests.validationRequest,
  moviesController.getMovieById
);

router.post("/createUser", async (req, res) => {
  try {
    const { name, role } = req.body;
    const token = await generateToken(name, role);
    return response200(res, token);
  } catch (error) {
    return internalServerResponse(res, error);
  }
});

export default router;
