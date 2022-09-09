import mongoose, { Schema, Document } from "mongoose";
import User from "./user.model";

export enum Roles {
  Admin,
  User,
}

export interface WatchlistDocument extends Document {
  name: string;
  description: string;
  stocks: string[];
  user: typeof User;
  createdAt: Date;
}

const watchlistSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  stocks: [{ type: String, unique: true }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<WatchlistDocument>("watchlist", watchlistSchema);
