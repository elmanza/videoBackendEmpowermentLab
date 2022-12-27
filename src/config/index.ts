import dotenv from "dotenv";
dotenv.config();
import * as path from "path";
export const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: Number(process.env.PORT) || 3000,
    cors: process.env.CORS,
    url_server: process.env.URL_SERVER,
    authJwtService: `${process.env.JWT_SECRET}`,
    expireTimeToken: Number(process.env.JWT_EXPERIES_IN),
    algorithmToken: `${process.env.JWT_ALGORITHM}`,
    saltCrypt: `${process.env.SALT_ROUNDS}`,
    uploadedFileFolder: path.resolve(__dirname, `../../${process.env.UPLOADED_FILES_FOLDER}`),
    tmdb: process.env.TMDB_URL,
    tmdb_api_key: process.env.TMDB_API_KEY,
    tmdb_auth: process.env.TMDB_AUTH
}

export const db = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    mongo: String(process.env.MONGO_ATLAS),
    DS: process.env.DATA_SOURCE
}

export default { config, db };