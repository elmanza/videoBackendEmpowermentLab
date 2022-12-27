import { Response, NextFunction } from "express";
import favoriteMovieServices from "../services/favoriteMovieService";


class FavoriteMovie {
    async toggle(req:any, res:Response, next:NextFunction){
        try {
            let { movieID } = req.body;
            const response = await favoriteMovieServices.toggle(req.user, movieID);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req:any, res:Response, next:NextFunction){
        try {
            const response = await favoriteMovieServices.getAll(req.user);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new FavoriteMovie();