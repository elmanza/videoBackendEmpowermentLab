import { Application, Request, Response } from "express";
import moviesApi  from "../components/movies";
import userApi  from "../components/users";
import authApi  from "../components/authenticationTMDB";
import favoriteMoviesApi from "../components/favoriteMovies";
import notesMoviesApi  from "../components/NotesMovies";
export default (app:Application) =>{
    moviesApi(app);
    userApi(app);
    authApi(app);
    favoriteMoviesApi(app);
    notesMoviesApi(app);
    app.get("/", (req: Request, res:Response)=> res.send("Todo ok!!!"));
}