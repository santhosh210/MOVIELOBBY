import mongoose, { Document, Schema } from "mongoose";

// Define the structure of the Movie document using the Mongoose Document interface
export interface Movie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

// Define the schema for the Movie model
const MovieSchema = new Schema({
  title: String, // Title of the movie
  genre: String, // Genre of the movie
  rating: Number, // Rating of the movie
  streamingLink: String, // Link to stream the movie
});

// Create and export the Movie model based on the defined schema
export default mongoose.model<Movie>("Movie", MovieSchema);
