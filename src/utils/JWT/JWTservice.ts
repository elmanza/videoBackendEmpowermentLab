import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import * as boom from '@hapi/boom';

class JWT {

    async verify (token: string){
        try {
            return await jwt.verify(token, config.authJwtService, { algorithms: ['HS256'] });
        } catch (error:any) {
            throw boom.badImplementation(error);
        }
    }

    async generate (payloadTokenData:Object){
        try {
            return await  jwt.sign(payloadTokenData, config.authJwtService, {
                expiresIn: config.expireTimeToken *  1000 || 600000,
                algorithm: 'HS256'
                    
            });
        } catch (error:any) {
            throw boom.badImplementation(error);
        }
    }

    async decode (token:string){
        try {
            return await jwt.decode(token, { complete: true })
        } catch (error:any) {
            throw boom.badImplementation(error);
        }
    }
}

export default new JWT();