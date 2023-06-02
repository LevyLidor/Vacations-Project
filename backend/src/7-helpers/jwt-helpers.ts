import jwt from "jsonwebtoken";
import LoginModel from "../4-models/loginModel";
import { UserModel } from "../4-models/userModel";

const secretKey = 'winterIsComing';

function getNewToken(user: LoginModel) {

    const payload = { user };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
}


function verifyTokenAsync(authorizationHeader: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {

        if (!authorizationHeader) {
            resolve(false);
            return;
        };

        const token = authorizationHeader.split(" ")[1];

        if (!token) {
            resolve(false);
            return;
        };

        jwt.verify(token, secretKey, (err: any, payload: any) => {

            if (err) {
                resolve(false);
                return;
            };

            resolve(true);
        });


    });
}

function getUserFromToken(authorizationHeader: string): UserModel {

    const token = authorizationHeader.split(" ")[1];

    const payload = jwt.decode(token);

    const user = (payload as any).user;

    return user
}

export default {
    getNewToken,
    verifyTokenAsync,
    getUserFromToken
}