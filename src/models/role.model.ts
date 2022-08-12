import mongoose, { Schema, Document } from "mongoose";

export interface Role extends Document {
  type: string;
  description: string;
}

const RoleSchema: Schema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<Role>("Role", RoleSchema);
