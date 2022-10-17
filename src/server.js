import cors from 'cors';
import dotenv from "dotenv";
import express, { json } from "express";

dotenv.config();

import router from "./routers/index.js";

const server = express();

server.use(cors());
server.use(json());

server.use(router);

server.listen(process.env.PORT, () => {
    console.log("server running on port " + process.env.PORT);
}
);