import { Request, Response } from "express";
import MovieModel, { Movie } from "../models/Movie";
import { matchedData } from "express-validator";
import { response200 } from "../helpers/responses/sucessResponse";
import { internalServerResponse } from "../helpers/responses/serverErrorResponse";
import { req } from "../typings/global";
import { unauthorized } from "../helpers/responses/errorResponse";
import redisClient from "../helpers/service/redisConnection";

export const getMovies = async (req: req, res: Response) => {
  try {
    const requestData = matchedData(req);
    let skip = 0;
    let limit = 0;
    if (requestData.page && requestData.limit) {
      skip = (requestData.page - 1) * requestData.limit;
      limit = requestData.limit;
    }

    const keys = await redisClient.keys("*");
    const allData = await Promise.all(
      keys.map(async (key) => {
        const value: any = await redisClient.get(key);
        return { key, value: JSON.parse(value) };
      })
    );
    if (allData) {
      return response200(res, allData);
    }

    let filterObj = {};
    if (requestData.q) {
      filterObj = {
        ...filterObj,
        $or: [
          { title: { $regex: new RegExp(requestData.q as string, "i") } },
          { genre: { $regex: new RegExp(requestData.q as string, "i") } },
        ],
      };
    }
    const movies = await MovieModel.find(filterObj)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    const movieCount: number = await MovieModel.countDocuments(
      filterObj
    ).exec();
    let data = {
      movies: movies,
      page: Number(requestData.page),
      limit: limit,
      totalPageCount: Math.ceil(movieCount / limit),
      totalCount: movieCount,
    };
    return response200(res, data);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const addMovie = async (req: req, res: Response) => {
  if (req.user?.role !== "Admin") {
    return unauthorized(
      res,
      "Unauthorised to perform the action, Contact Admin."
    );
  }
  try {
    const requestData = matchedData(req);
    console.log({ requestData });
    const newMovie = new MovieModel({
      ...requestData,
    });
    const savedMovie: any = await newMovie.save();
    let data = await redisClient.set(
      savedMovie._id,
      JSON.stringify(savedMovie)
    );
    console.log({ data });
    return response200(res, savedMovie);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const updateMovie = async (req: req, res: Response) => {
  if (req.user?.role !== "Admin") {
    return unauthorized(
      res,
      "Unauthorised to perform the action, Contact Admin."
    );
  }
  try {
    const requestData = matchedData(req);
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      requestData.movieId,
      {
        ...requestData,
      },
      { new: true }
    );
    await redisClient.set(requestData.movieId, JSON.stringify(updateMovie));
    return response200(res, updatedMovie);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const getMovieById = async (req: req, res: Response) => {
  try {
    const requestData = matchedData(req);
    let cacheData = await redisClient.get(requestData.movieId);
    if (cacheData) {
      return response200(res, JSON.parse(cacheData));
    }
    const movie = await MovieModel.findById(requestData.movieId);
    return response200(res, movie);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const deleteMovie = async (req: req, res: Response) => {
  if (req.user?.role !== "Admin") {
    return unauthorized(
      res,
      "Unauthorised to perform the action, Contact Admin."
    );
  }

  try {
    const requestData = matchedData(req);
    const deletedResponse = await MovieModel.findByIdAndDelete(
      requestData.movieId
    );
    await redisClient.del(requestData.movieId);
    return response200(res, deletedResponse);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const searchMovie = async (req: Request, res: Response) => {
  const { q } = req.query;

  try {
    const movies = await MovieModel.find({
      $or: [
        { title: { $regex: new RegExp(q as string, "i") } },
        { genre: { $regex: new RegExp(q as string, "i") } },
      ],
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
