import { Request, Response, NextFunction } from "express";
import userServices from "../services/userService";
import * as boom from '@hapi/boom';

class User {

    async create(req:Request, res:Response, next:NextFunction){
        try {
            let response = await userServices.create(req.body);
            res.json(response);
        } catch (error:any) {
            next(boom.internal(error));
        }
    }
}

export default new User();