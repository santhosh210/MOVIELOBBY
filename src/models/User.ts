import mongoose, { Document, Schema } from "mongoose";

// Define the structure of the User document using the Mongoose Document interface
export interface User extends Document {
  username: string; // Username of the user
  password: string; // Password of the user
  role: string; // Role of the user
}

// Define the schema for the User model
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true }, // Unique and required username
  password: { type: String, required: true }, // Required password
  role: { type: String, required: true, default: "user" }, // Default role is 'user'
});

// Create and export the User model based on the defined schema
export default mongoose.model<User>("User", UserSchema);
