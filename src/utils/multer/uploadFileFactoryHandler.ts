import { Request } from "express";
import * as Path from "path";
import { config } from "../../config";
import FileManager from "./fileManager";
import * as mkdirp from "mkdirp";

class UploadFileFactory {
    
  static getTmpFolder(folderName:string){
    return Path.resolve(config.uploadedFileFolder + '/tmp/' + folderName);
  }

  static getFileNameFunction(nameParams:any){
    let fileName = function(req:Request, file:any, callback:any){
      if(typeof req.body[nameParams] == 'undefined'){
        req.body[nameParams] = {
          files: []
        }
      }
      let originalname = file.originalname;
      let fileName = new Date().getTime() + '_' + originalname;
      req.body[nameParams].files.push({
        fileName,
        originalname: originalname
      });
      callback(null, fileName);
    }
    return fileName;
  }

  static getDestinationFunction(nameParams:string, path:string){
    let destination = function(req:Request, file:any, callback:any){
      if(typeof req.body[nameParams] == 'undefined'){
        req.body[nameParams] = {
          path: null,
          files: []
        }
      }
      req.body[nameParams].path = path;
      mkdirp.sync(req.body[nameParams].path);
      callback(null, path);
    }
    return destination;
  }

  getUploadMiddleware(
      nameParams:string,
      folderName:string,
      compressImage = false,
      rules:any= null,
      limits = {},
      tmp = false){
    const path = UploadFileFactory.getTmpFolder(folderName);
    const destination = UploadFileFactory.getDestinationFunction(nameParams, path);
    const fileName = UploadFileFactory.getFileNameFunction(nameParams);

    const fileManager = new FileManager(destination, fileName);

    return fileManager.uploadFile(
      nameParams,
      'array',
      rules,
      compressImage,
      limits,
      tmp
    )
  }
}


export default new UploadFileFactory();


