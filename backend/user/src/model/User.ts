import mongoose, { Document, Schema, model } from "mongoose";

// Interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
}

// Define Schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export model
export const User = model<IUser>("User", userSchema);
