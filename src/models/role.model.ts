import mongoose, { Schema, Document } from "mongoose";

export enum Roles {
  Admin,
  User,
}

export interface RoleDocument extends Document {
  type: string;
  description: string;
  createdAt: Date;
}

const roleSchema: Schema = new Schema({
  type: {
    type: String,
    enum: Object.values(Roles),
    unique: true,
    required: true,
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<RoleDocument>("Role", roleSchema);
