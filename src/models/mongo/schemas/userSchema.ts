import { Schema, model } from 'mongoose';

interface IUser {
    name: string;
    username: string;
    password: string;
    token?: any;
    currentaccess?: any;
    session_id?: any;
  }
  

const name = { type: String, required: true };
const username = { type: String, required: true };
const password = { type: String, required: true };
const token = { type: String, required: false };
const currentaccess = { type: String, required: false };
const session_id = { type: String, required: false };

const userCreateSchema = {
    name,
    username,
    password,
    token,
    currentaccess,
    session_id
}

const userSchema = new Schema<IUser>(userCreateSchema);
export const userModel = model("user", userSchema);

