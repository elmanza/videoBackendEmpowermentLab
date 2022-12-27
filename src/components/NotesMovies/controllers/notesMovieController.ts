import { Request, Response, NextFunction } from "express";
import notesMovieServices from "../services/notesMovieService";


class NotesMovie {

    async create(req:any, res:Response, next:NextFunction){
        try {
            const response = await notesMovieServices.create(req.user, req.body);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req:any, res:Response, next:NextFunction){
        try {
            let { id } = req.params;
            const response = await notesMovieServices.getAll(id);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async update(req:any, res:Response, next:NextFunction){
        try {
            let { idnote } = req.params;
            const response = await notesMovieServices.update(req.user, idnote, req.body);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    
}

export default new NotesMovie();