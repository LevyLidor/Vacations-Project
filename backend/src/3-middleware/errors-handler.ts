import { NextFunction, Request, Response } from "express";
import ErrorModel from "../4-models/error-modle";

function errorsHandler(err: any, request: Request, response: Response, next: NextFunction): void {

    if (err instanceof Error) {
        response.status((err as any).status || 500).send(err.message);
        return;
    };

    if (err instanceof ErrorModel) {
        response.status(err.status).send(err.message);
        return;
    };

};

export default errorsHandler;