// Import the custom request interface from the typings directory
import { req } from "./typings/global.d";

// Import required modules and dependencies
import express, { Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import moviesRouter from "./routes/movies";
import verifyToken from "./middlewares/authMiddleware";

// Create an instance of the Express application
const app = express();

// Set the port for the server to listen on
const PORT = 5000;

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listener for successful MongoDB connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Event listener for MongoDB connection errors
mongoose.connection.on("error", (err: Error) => {
  console.error("MongoDB connection error:", err);
});

// Use the bodyParser middleware to parse JSON in request bodies
app.use(bodyParser.json());

// Use the moviesRouter for handling movie-related routes
app.use("/movies", moviesRouter);

// Start the Express server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
