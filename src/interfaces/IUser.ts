import { Types } from "mongoose";

export interface IUser{
  _id: Types.ObjectId;
  name: String;
  username: String;
  password: String | undefined;
  currentaccess: String;
  token: String;
  session_id: String;
}