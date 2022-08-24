import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "./role.model";

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  roles: Roles[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: Roles.User,
    },
  ],
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<UserDocument>("User", UserSchema);
