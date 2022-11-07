import { Document, Schema, Model, model } from 'mongoose';

const UserSchema: Schema = new Schema({
  email: { type: String },
  name: { type: String },
  role: { type: String },
  department: { type: String },
  dob: {type: Date},
  salary: { type: Number },
  removed: {type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

export interface IUser extends Document{
  email: string;
  name: string;
  role: string;
  department: string;
  dob: Date;
  salary: number;
  removed: boolean;
  timestamp: Date;
  save(): any;
}

export const User: Model<IUser> = model<IUser>('User', UserSchema);