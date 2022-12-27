import mongoose from 'mongoose';
import { db } from "../..";
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
let connection:any = null;
export const Database = {
    connect: () => {
        if (connection) return connection;
        return mongoose.connect(db.mongo).then(connectionDB =>  {
            connection = connectionDB;
            console.log('Mongoose Connected!');
        }).catch(err => console.log("[Error Mongoose]", err))
    }
}