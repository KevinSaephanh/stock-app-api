import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config';

export enum Role {
  Admin,
  User,
}

interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  roles: Role[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  roles: [
    {
      type: String,
      enum: Role,
      default: 'User',
    },
  ],
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre<UserDocument>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const hash = await bcrypt.hash(user.password, config.auth.saltRounds);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<UserDocument>('User', userSchema);
