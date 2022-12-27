import { Router, Application } from "express";
const router = Router();
import userController from "./controllers/userController";
import uploadFileMiddleware from "./middlewares/uploadFileMiddleware";

export default (app:Application) => {
    app.use("/user", router);
    router.post('/', [uploadFileMiddleware.uploadFile()], userController.create);
}