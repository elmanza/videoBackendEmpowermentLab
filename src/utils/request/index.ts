import axios from "axios";
import * as boom from "@hapi/boom";
import { API_LINKS } from "../constants/";
import { config } from "../../config";

export default async (list:string = '', url:string = '', data:any = {}, method = 'get') => {
  if(!API_LINKS.includes(list)) throw boom.badRequest('Invalid URL');
  try {
    return method == 'get' 
      ? await axios.get(`${config.tmdb}${url}`)
      : await axios.post(`${config.tmdb}${url}`, data);
  } catch (error:any) {
    throw boom.badImplementation(error);
  }
}