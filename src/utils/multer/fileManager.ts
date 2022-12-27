import { Request } from "express";
import multer = require("multer");
import { config } from "../../config";
import * as mkdirp from "mkdirp";
const FILE_NAME = 'singleFile'
const TYPE_FILE = 'single'
const RULES = /jpeg|jpg|png|gif|tiff|psd|jfif/;
class FileManager {
    destination: any;
    fileName: any;

    constructor(destinationFunction:any, fileNameFunction:any){
        let destination = function(req:Request, file:Express.Multer.File, callback: (error: Error | null, filename: string | boolean) => void){
            mkdirp.sync(config.uploadedFileFolder);
            callback(null, config.uploadedFileFolder)
        }
        
        let fileName = function(req:Request, file:Express.Multer.File, callback: (error: Error | null, filename: string | boolean) => void){
            callback(null, file.originalname);
        }

        this.destination = destinationFunction || destination;
        this.fileName = fileNameFunction || fileName;
    }
    uploadFile(
        fileName = FILE_NAME,
        type:string = TYPE_FILE,
        rules = RULES,
        compressImage = false,
        limits = {},
        tmp = false
    ){
        let multerOptions:any = {
          storage: tmp ? multer.memoryStorage() : multer.diskStorage({
            filename: this.fileName,
            destination: this.destination
          }),
          limits,
          fileFilter: function(req:Request, file:Express.Multer.File, callback: (error: Error | null, filename: string | boolean) => void){
            if(!rules){return callback(null, true)}
          }
        }

        return multer(multerOptions).single(fileName);
    }
}


export default FileManager;