import { req } from "./typings/global.d";
import express, { Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import moviesRouter from "./routes/movies";
import { verify } from "crypto";
import verifyToken from "./middlewares/authMiddleware";

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err: Error) => {
  console.error("MongoDB connection error:", err);
});

app.use(bodyParser.json());

app.use("/movies", moviesRouter);

app.get("/a", verifyToken, (req: req, res: Response) => {
  console.log({ req: req.user });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
