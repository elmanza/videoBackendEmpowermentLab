import { Router, Application } from "express";
const router = Router();
import MovieController from "./controllers/favoriteMovieController";
import {authenticatedUser} from '../../utils/middlewares/authenticatedUser';

export default (app:Application) =>{
    app.use("/favoritemovie", router);
    
    router.use(authenticatedUser);
    router.post('/', MovieController.toggle);
}