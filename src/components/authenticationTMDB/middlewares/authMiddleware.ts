import { Response, NextFunction } from "express";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;
import boom from '@hapi/boom';
import JWTService from '../../../utils/JWT/JWTservice';
import { userModel } from "../../../models/mongo/schemas/userSchema";
export default class AuthMiddleware {
  static async getAuthenticatedUser(req:any, res:Response, next:NextFunction) {
    try {
      const authorization = req.headers.authorization || '';
      const token = authorization.split(' ')[1];
      if (await JWTService.verify(token)) {
        let payload:any = await JWTService.decode(token);
        let user:any = await userModel.findOne( {_id: payload.payload.id}, {__v:0, password:0});
        if (user != null) {
          await user.updateOne({ token: token });          
          req.user = user;
          req.user.token = token;
          next();
        } else {
          next(boom.unauthorized());
        }
      } else {
        next(boom.unauthorized());
      }
    } catch (error:any) {
      next(boom.internal(error));
    }
  }
}
