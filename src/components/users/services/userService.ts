import Crypter  from "../../../utils/crypter/crypterservice";
import JWT  from "../../../utils/JWT/JWTservice";
import { userModel } from "../../../models/mongo";
import { Types } from "mongoose";
import authService from "../../authenticationTMDB/services/authService";
import * as boom from '@hapi/boom';
import { config } from "../../../config";
import {IUser} from "../../../interfaces/IUser";

class Users {

    async get(id:Types.ObjectId){
        try {
            return await userModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async create(obj:IUser){
        try {
            let { password } = obj;
            password = await Crypter.encryptPassword(password);
            delete obj.password;
            const tokenTMDB = await authService.newTokenTMDB();
            if(!tokenTMDB.success) throw boom.internal(tokenTMDB.status_message);
            const user = await userModel.create({...obj, password, currentaccess: tokenTMDB.request_token});            
            const token = await JWT.generate({id: user._id});
            await user.updateOne({token});  
            const userFound = await userModel.findById(user._id, {__v:0, password:0});
            return {
                user:userFound, 
                validateSession:true, 
                redirect: `${config.tmdb_auth}${tokenTMDB.request_token}?redirect_to=${config.url_server}auth/approved`
            };
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(username:string){
        try {
            return await userModel.findOne({ where: { username: username.trim() } });
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id:Types.ObjectId){
        try {
            return await userModel.findOne({ _id: new Types.ObjectId(id)});
        } catch (error) {
            throw error;
        }
    }
    
    async update(id:Types.ObjectId, payload:IUser){
        try {
            return await userModel.updateOne({ _id: new Types.ObjectId(id)}, {...payload});
        } catch (error) {
            throw error;
        }
    }

}

export default new Users();