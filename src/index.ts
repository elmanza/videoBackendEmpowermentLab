import express = require("express");
import {Express} from "express";
import cors = require("cors");
import serverRoutes from "./routes";
import * as path from "path";
// import cluster from "cluster";
// import os from "os"; //.cpus().length;
import { config } from "./config";
import  errorStack from './utils/middlewares/errorHandlers';
import  notFoundHandler from './utils/middlewares/notFoundHandler';
import  {Database} from './config/DB/mongoose';

class App {
  app: Express;
  port: number;
    constructor(){
        this.app = express();
        this.port = config.port;
        this.settings();
        this.views();
        this.middlewares();
        this.routes();
        this.middlewaresCatch();
    }

    settings(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static('public'));
    }

    views(){
        this.app.set('views', path.join(__dirname, 'views', 'ejs'));
        this.app.set('view engine', 'ejs');;
    }

    middlewares(){
        const corsOptions ={
        origin:'http://localhost:3000', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }
        this.app.use(cors(corsOptions));
    }

    middlewaresCatch(){
        // Catch 404
        this.app.use(notFoundHandler);
        //Errors controllers
        this.app.use(errorStack.logErrors);
        this.app.use(errorStack.wrapErrors);
        this.app.use(errorStack.errorHandler);
    }

    async routes(){
        serverRoutes(this.app);
    }

    async listen(){
        await Database.connect();
      
        // try {
        //     if(cluster.isMaster){
               
        //         for (let i = 0; i < numCPUs; i++) {
        //             cluster.fork();              
        //         }
        //         cluster.on("exit", (worker, corde, signal)=>{
        //             console.log(`Worker dead ${worker.process.pid}`);
        //             cluster.fork();
        //         })
        //     }else{
        //         this.app.listen(this.port, err=>{
        //             console.log(`Server on http://localhost:${this.port} PID-> ${process.pid}`)
        //         })
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        

        this.app.listen(this.port, () =>{
            console.log(`Server on http://localhost:${this.port}`)
        });
    }
}
export default new App();