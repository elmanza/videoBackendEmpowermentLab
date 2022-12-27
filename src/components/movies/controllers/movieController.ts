import { Request, Response, NextFunction } from "express";
import movieServices from "../services/movieService";


class Movie {
    async popularList(req:any, res:Response, next:NextFunction){
        try {
            const response = await movieServices.popularList(req.query);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async search(req:any, res:Response, next:NextFunction){
        try {
            const response = await movieServices.search(req.query);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getById(req:Request, res:Response, next:NextFunction){
        try {
            let { id } = req.params;
            const response = await movieServices.getById(Number(id));
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getFavorites(req:any, res:Response, next:NextFunction){
        try {
            const response = await movieServices.getFavorites(req.user);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new Movie();