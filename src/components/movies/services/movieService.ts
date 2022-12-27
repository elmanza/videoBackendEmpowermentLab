import { config } from "../../../config";
import rqst_TMDB from "../../../utils/request";
import { favoriteMovieModel, movieModel } from "../../../models/mongo";
import mongoose from "mongoose";
import ObjectId = mongoose.Types.ObjectId;
import {IUser} from "../../../interfaces/IUser";
import {ISearchingParams} from "../../../interfaces/ISearchingParams";
class Movie {
  async popularList(queryData:ISearchingParams){
    try {
      let { page = 1, language = 'en-US' } = queryData;
      let url = `movie/popular?api_key=${config.tmdb_api_key}&language=${language}&page=${page}`;
      let response = await rqst_TMDB('tmdb', url);
      return response.data;
    } catch (error:any) {
      throw error;
    }
  }

  async search(queryData:ISearchingParams){
    try {
      let { page, language, query, include_adult = false } = queryData;
      let url = `search/movie?api_key=${config.tmdb_api_key}&language=${language}&query=${query}&page=${page}&include_adult=${include_adult}`;
      let response = await rqst_TMDB('tmdb', url);
      return response.data;
    } catch (error:any) {
      throw error;
    }
  }

  async getByIdAxios(id:number){
    try {
      let url = `movie/${id}?api_key=${config.tmdb_api_key}`;
      let response = await rqst_TMDB('tmdb', url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id:number){
    try {
      return await this.findOrCreate(id, true);
    } catch (error:any) {
      throw error;
    }
  }

  async getFavorites(user:IUser){
    try {
      return await favoriteMovieModel.find({userId: new ObjectId(user._id)}, {_id:0, userId:0, __v:0}).populate({
        path: 'movieId',
        model: 'movie'
      });
    } catch (error:any) {
      throw error;
    }
  }

  async findOrCreate(movieApiId:number, getComments = false){
    try {
      let movieFound:any = getComments
      ? await movieModel.findOne({movieApiId: Number(movieApiId)}).populate({
          path: 'notes',
          model: 'movienote',
          select: {__v:0, movieId:0},
          populate:[{
            path: 'userId',
            model: 'user',
            select: {name:1, username:1, _id:1}
          }]
        }) 
      : await movieModel.findOne({movieApiId: Number(movieApiId)});
      if(!movieFound){
        let getMovie = await this.getByIdAxios(movieApiId);
        movieFound = await movieModel.create({
          movieApiId: getMovie.id,
          movieIMDBId: getMovie.imdb_id,
          genres: getMovie.genres,
          originalLanguages: getMovie.original_language,
          title: getMovie.title,
          overview: getMovie.overview,
          popularity: getMovie.popularity,
          posterPath: getMovie.poster_path,
          releaseDate: getMovie.release_date,
          video: getMovie.video,
          voteAverage: getMovie.vote_average,
          voteCount: getMovie.vote_count,
          notes: []
        });
      }
      return movieFound;      
    } catch (error:any) {
      throw error;
    }
  }

  
};

export default new Movie();