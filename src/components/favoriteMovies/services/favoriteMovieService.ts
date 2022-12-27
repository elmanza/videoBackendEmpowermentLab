import { favoriteMovieModel } from "../../../models/mongo";
import movieServices from "../../movies/services/movieService";
import {IUser} from "../../../interfaces/IUser";


class FavoriteMovie {
  async toggle(user:IUser, movieApiId:number){
    try {
      let movieFound = await movieServices.findOrCreate(movieApiId, false);
      let data = {
        movieId: movieFound._id, 
        userId: user._id
      }
      let favoriteMovieFound = await favoriteMovieModel.find(data);
      return favoriteMovieFound.length ? await favoriteMovieModel.deleteOne(data): await favoriteMovieModel.create(data);
    } catch (error:any) {
      throw error;
    }
  }

  async getAll(user:IUser){
    try {
      return await favoriteMovieModel.find({userId: user._id});
    } catch (error:any) {
      throw error;
    }
  }

};

export default new FavoriteMovie();