import mongoose, { Document, Schema } from "mongoose";

export interface Movie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const MovieSchema = new Schema({
  title: String,
  genre: String,
  rating: Number,
  streamingLink: String,
});

export default mongoose.model<Movie>("Movie", MovieSchema);
