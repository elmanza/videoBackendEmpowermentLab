import {Schema, model, Types } from "mongoose";

interface IFavoriteMovie {
    movieId: Types.ObjectId;
    userId: Types.ObjectId;
    createdAt: Date;
  }


const movieId = { type: Schema.Types.ObjectId, ref: 'movie' };
const userId = { type: Schema.Types.ObjectId, ref: 'user' };
const createdAt = { type: Date, required: false };

const favoriteMovieCreateSchema = {
    movieId,
    userId,
    createdAt
}

const favoriteMovieSchema = new Schema<IFavoriteMovie>(favoriteMovieCreateSchema);
export const favoriteMovieModel = model("favoritemovie", favoriteMovieSchema);