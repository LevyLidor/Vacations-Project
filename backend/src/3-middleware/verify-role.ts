import { NextFunction, Request, Response } from "express";
import { string } from "joi";
import ErrorModel from "../4-models/error-modle";
import Role from "../4-models/role";
import jwtHelpers from "../7-helpers/jwt-helpers";


function verifyRole(roleToCheck: Role) {

    return async (request: Request | any, response: Response, next: NextFunction) => {

        const authorizationHeader = request.header("authorization");

        const isValidToken = await jwtHelpers.verifyTokenAsync(authorizationHeader);

        if (!isValidToken) {
            next(new ErrorModel(401, "Invalid or expired token"));
            return;
        };

        
        const user = jwtHelpers.getUserFromToken(authorizationHeader);

        if (user.id) {
            request.tokenData = user;
        }


        if (user.role < roleToCheck) {
            next(new ErrorModel(403, "You are not authorized"));
            return;
        }

        next();

    }
}

export default verifyRole;