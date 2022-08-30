import mongoose, { Schema, Document } from "mongoose";

export enum Roles {
  Admin = "admin",
  User = "user",
}

export interface RoleDocument extends Document {
  type: string;
  description: string;
  createdAt: Date;
}

const RoleSchema: Schema = new Schema({
  type: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.User,
    required: true,
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<RoleDocument>("Role", RoleSchema);
