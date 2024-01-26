import { Request, Response } from "express";
import MovieModel from "../models/Movie";
import { matchedData } from "express-validator";
import { response200 } from "../helpers/responses/sucessResponse";
import { internalServerResponse } from "../helpers/responses/serverErrorResponse";
import { req } from "../typings/global";
import { unauthorized } from "../helpers/responses/errorResponse";
import redisClient from "../helpers/service/redisConnection";

// Get movies, utilize Redis for caching
export const getMovies = async (req: req, res: Response) => {
  try {
    // Get request data
    const requestData = matchedData(req);

    // Check Redis for cached data
    const cachedData: any = await redisClient.get("movies");
    if (cachedData) {
      console.log("Data found in Redis cache");
      return response200(res, JSON.parse(cachedData));
    }

    let skip = 0;
    let limit = 0;
    if (requestData.page && requestData.limit) {
      skip = (requestData.page - 1) * requestData.limit;
      limit = requestData.limit;
    }

    // Prepare filter object for search
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

    // Fetch data from the database
    const movies = await MovieModel.find(filterObj)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    // Cache each movie in Redis
    movies.forEach(async (obj: any) => {
      await redisClient.set(obj._id, JSON.stringify(obj));
    });

    // Calculate additional data for the response
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

    // Store the entire data in Redis for future use
    await redisClient.set("movies", JSON.stringify(data)); // Adjust expiration if needed

    // Return the response
    return response200(res, data);
  } catch (error) {
    console.log({ error });
    // Handle errors
    return internalServerResponse(res, error);
  }
};

// Add a movie
export const addMovie = async (req: req, res: Response) => {
  // Authorization check
  if (req.user?.role !== "Admin") {
    return unauthorized(
      res,
      "Unauthorised to perform the action, Contact Admin."
    );
  }

  try {
    // Get request data
    const requestData = matchedData(req);
    console.log({ requestData });

    // Create a new movie
    const newMovie = new MovieModel({
      ...requestData,
    });

    // Save the movie to the database
    const savedMovie: any = await newMovie.save();

    // Cache the new movie in Redis
    await redisClient.set(savedMovie._id, JSON.stringify(savedMovie));

    // Return success response
    return response200(res, savedMovie);
  } catch (error) {
    // Handle errors
    return internalServerResponse(res, error);
  }
};

// Update a movie
export const updateMovie = async (req: req, res: Response) => {
  // Authorization check
  if (req.user?.role !== "Admin") {
    return unauthorized(
      res,
      "Unauthorised to perform the action, Contact Admin."
    );
  }

  try {
    // Get request data
    const requestData = matchedData(req);

    // Update the movie in the database
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      requestData.movieId,
      {
        ...requestData,
      },
      { new: true }
    );

    // Update the cached movie in Redis
    await redisClient.set(requestData.movieId, JSON.stringify(updatedMovie));

    // Return success response
    return response200(res, updatedMovie);
  } catch (error) {
    // Handle errors
    return internalServerResponse(res, error);
  }
};

// Get movie by ID
export const getMovieById = async (req: req, res: Response) => {
  try {
    // Get request data
    const requestData = matchedData(req);

    // Check if movie is available in Redis cache
    let cacheData = await redisClient.get(requestData.movieId);
    if (cacheData) {
      // Return cached data if available
      return response200(res, JSON.parse(cacheData));
    }

    // Fetch movie from the database
    const movie = await MovieModel.findById(requestData.movieId);

    // Return the response
    return response200(res, movie);
  } catch (error) {
    // Handle errors
    return internalServerResponse(res, error);
  }
};

// Delete a movie
export const deleteMovie = async (req: req, res: Response) => {
  // Authorization check
  if (req.user?.role !== "Admin") {
    return unauthorized(
      res,
      "Unauthorised to perform the action, Contact Admin."
    );
  }

  try {
    // Get request data
    const requestData = matchedData(req);

    // Delete the movie from the database
    const deletedResponse = await MovieModel.findByIdAndDelete(
      requestData.movieId
    );

    // Delete the cached movie from Redis
    await redisClient.del(requestData.movieId);

    // Return success response
    return response200(res, deletedResponse);
  } catch (error) {
    // Handle errors
    return internalServerResponse(res, error);
  }
};

// Search for movies
export const searchMovie = async (req: Request, res: Response) => {
  const { q } = req.query;

  try {
    // Search for movies in the database
    const movies = await MovieModel.find({
      $or: [
        { title: { $regex: new RegExp(q as string, "i") } },
        { genre: { $regex: new RegExp(q as string, "i") } },
      ],
    });

    // Return the response
    res.json(movies);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};
