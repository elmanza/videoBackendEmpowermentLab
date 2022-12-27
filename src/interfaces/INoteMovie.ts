import { Types } from "mongoose";

export interface INoteMovie{
  _id: Types.ObjectId;
  movieId: Types.ObjectId;
  movieID: number;
  userId: Types.ObjectId;
  noteTitle: String;
  description: String;
}