import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  roles: any[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export default mongoose.model<User>("User", UserSchema);
