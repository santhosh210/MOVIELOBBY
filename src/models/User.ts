import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  role: string;
}

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" }, // Default role is 'user'
});

export default mongoose.model<User>("User", UserSchema);
