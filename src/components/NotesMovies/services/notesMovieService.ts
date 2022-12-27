import { config } from "../../../config";
import rqst_TMDB from "../../../utils/request";
import { movieNoteModel, movieModel } from "../../../models/mongo";
import mongoose from "mongoose";
import ObjectId = mongoose.Types.ObjectId;
import movieServices from "../../movies/services/movieService";
import {IUser} from "../../../interfaces/IUser";
import {INoteMovie} from "../../../interfaces/INoteMovie";
class NotesMovie {
  async create(user:IUser, payload:INoteMovie){
    try {
      let { movieID, noteTitle, description } = payload;
      let movieFound = await movieServices.findOrCreate(movieID);

      let movieNoteCreated = await movieNoteModel.create({
        movieId:movieFound._id, 
        userId: user._id,
        noteTitle,
        description
      });

      movieFound.notes = await movieFound.notes.concat(movieNoteCreated._id);
      await movieFound.save();
      
      return {movieNoteCreated, movieFound};
    } catch (error) {
      throw error;
    }
  }

  async getAll(movieApiId:string){
    try {
      return await movieNoteModel.find({movieId: new ObjectId(movieApiId)});
    } catch (error) {
      throw error;
    }
  }

  async update(user:IUser, idNote:ObjectId, payload:INoteMovie){
    try {
      return await movieNoteModel.updateOne({ _id: new ObjectId(idNote), userId: new ObjectId(user._id)}, {...payload});
    } catch (error) {
      throw error;
    }
  }

  

};

export default new NotesMovie();