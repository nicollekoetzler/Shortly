import cors from 'cors';
import dotenv from "dotenv";
import express, { json } from "express";
import authRouter from "./routers/authRouter.js"
import urlRouter from "./routers/urlsRouter.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(json());

server.use(authRouter);
server.use(urlRouter);

server.listen(process.env.PORT, () => {
    console.log("server running on port " + process.env.PORT);
}
);