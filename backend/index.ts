import cors from "cors";
import express, { json, NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import errorsHandler from "./src/3-middleware/errors-handler";
import ErrorModel from "./src/4-models/error-modle";
import { vacationRouter } from "./src/6-controllers/vacation-controller";
import { userRouter } from "./src/6-controllers/user-controller";
import path from 'path';


const server = express();
server.use(fileUpload());

server.use(json());
server.use(cors());


server.use('/api', userRouter);
server.use('/api', vacationRouter);
server.use('/images', express.static(path.join(__dirname, 'src', 'images', 'vacations')));

server.use('*', (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Rout Not Found"));
});

server.use(errorsHandler);


server.listen(3005, () => {
    console.log('Listening on port 3005...');
});

