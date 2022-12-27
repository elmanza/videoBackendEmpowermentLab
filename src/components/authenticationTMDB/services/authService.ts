import JWT  from "../../../utils/JWT/JWTservice";
import {userModel} from "../../../models/mongo";
import Crypter  from "../../../utils/crypter/crypterservice";
import { config } from "../../../config";
import rqst_TMDB from "../../../utils/request";
import * as boom from '@hapi/boom';
class Auth {
    async login(username:String, password:String){
      try {
        let existUser = await userModel.findOne({username}, {__v:0});
        if(!existUser) throw boom.notFound('Email or password is incorrect');
        const success = await Crypter.comparePasswords(password, existUser.password)
        if(!success) throw boom.notFound('Email or password is incorrect');
        const token = await JWT.generate({id: existUser._id});
        await existUser.updateOne({token});  
        await existUser.save();
        existUser = await userModel.findById(existUser._id, {__v:0, password:0});
        return {
          user:existUser,
          token,
          type: 'Bearer',
          expires_in: config.expireTimeToken
        }
      } catch (error:any) {
        throw boom.internal(error);
      }
    }

    async verifyToken(token:string){
      try {
        let verication = await JWT.verify(token);
        if(!verication) throw boom.unauthorized('Token invalid');
        const payload:any = await  JWT.decode(token);
        let user = await userModel.findById(payload?.id, {__v:0, password:0});
        if(!user) throw boom.notFound('Expired token');
        return user;
      } catch (error:any) {
        throw boom.internal(error);
      }
    }

    async newTokenTMDB(){
      try {
        let response:any = await rqst_TMDB('tmdb', `authentication/token/new?api_key=${config.tmdb_api_key}`);
        if(response.data.success){
          return response.data;
        }
        throw boom.internal(response.status_message);
      } catch (error:any) {
        throw boom.internal(error);
      }
    }

    async authenticateSessionTMDB(request_token:any){
      try {
        let response:any = await rqst_TMDB('tmdb', `authentication/session/new?api_key=${config.tmdb_api_key}`, {request_token}, 'post');
        if(response.data.success){
          await userModel.updateOne({currentaccess: request_token},{session_id: response.data.session_id}); 
          return await userModel.findOne({currentaccess: request_token}, {__v:0, password:0});
        }
        throw boom.internal(response.status_message);
      } catch (error:any) {
        throw boom.internal(error);
      }
    }
};

export default new Auth();