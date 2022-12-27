import {Schema, model, Types } from "mongoose";


interface IUserMovieNote {
    movieId: Types.ObjectId;
    userId: Types.ObjectId;
    noteTitle: string;
    description: string;
    createdAt: Date;
  }

const movieId = { type: Schema.Types.ObjectId, ref: 'movie' };
const userId = { type: Schema.Types.ObjectId, ref: 'user' };
const noteTitle = { type: String, required: true };
const description = { type: String, required: true };
const createdAt = { type: Date, required: false };

const movieNoteCreateSchema = {
    movieId,
    userId,
    noteTitle,
    description,
    createdAt
}

const movieNoteSchema = new Schema<IUserMovieNote>(movieNoteCreateSchema);
export const movieNoteModel = model("movienote", movieNoteSchema);

