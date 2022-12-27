import { Request, Response, NextFunction } from "express";
import authServices from "../services/authService";
import boom from '@hapi/boom';

class Auth {
    async loginController(req:Request, res:Response, next:NextFunction){
        try {
            const { username, password } = req.body;
            if(!username || !password) throw boom.conflict('Complete all the information please!');
            const response = await authServices.login(username, password);
            res.status(200).json(response);
        } catch (error:any) {
            next(boom.internal(error));
        }
    }

    async verifyTokenController(req:Request, res:Response, next:NextFunction){
        try {
            const { token } = req.body;
            if(!token) throw boom.conflict('You did not send the token');
            const response = await authServices.verifyToken(token);
            res.status(200).json(response);
        } catch (error:any) {
            next(boom.internal(error));
        }
    }

    async authenticateSessionTMDB(req:Request, res:Response, next:NextFunction){
        try {
            const { request_token } = req.query;
            const response = await authServices.authenticateSessionTMDB(request_token);
            res.status(200).json(response);
        } catch (error:any) {
            next(boom.internal(error));
        }
    }
}

export default new Auth();