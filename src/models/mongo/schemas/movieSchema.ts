import {Schema, model, Types, Document } from "mongoose";

interface IMovie extends Document{
    movieApiId: Number;
    movieIMDBId: String;
    genres: [Schema.Types.Mixed];
    originalLanguages: String;
    title: String;
    overview: String;
    popularity: Number;
    posterPath: String;
    releaseDate: Date;
    video: Boolean;
    voteAverage: Number;
    voteCount: Number;
    notes: Array<Types.ObjectId>;
  }


const movieApiId = { type: Number, required: true };
const movieIMDBId = { type: String, required: true };
const genres = { type: [Schema.Types.Mixed], required: false};
const originalLanguages = { type: String };
const title = { type: String, required: true };
const overview = { type: String };
const popularity = { type: Number };
const posterPath = { type: String };
const releaseDate = { type: Date };
const video = { type: Boolean };
const voteAverage = { type: Number };
const voteCount = { type: Number };
const notes = [{ type: Types.ObjectId, ref: 'movienote' }];

const movieCreateSchema = {
    movieApiId,
    movieIMDBId,
    genres,
    originalLanguages,
    title,
    overview,
    popularity,
    posterPath,
    releaseDate,
    video,
    voteAverage,
    voteCount,
    notes
}

const movieSchema = new Schema<IMovie>(movieCreateSchema);
export const movieModel = model("movie", movieSchema);

