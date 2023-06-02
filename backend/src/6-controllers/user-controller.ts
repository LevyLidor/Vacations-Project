import { NextFunction, Request, Response, Router } from "express";
import { UserModel } from "../4-models/userModel";
import { getUserInfo, loginUser, registerUser } from "../5-logic/user-logic";
import CredentialsModel from "../4-models/credentials-model";
import verifyRole from "../3-middleware/verify-role";
import Role from "../4-models/role";


export const userRouter = Router();


userRouter.post("/register", async (req, res, next) => {
    try {

        const regUser = new UserModel(req.body);
        const user = await registerUser(regUser);
        return res.json(user);

    } catch (error) {
        next(error);
        return;
    }
});

userRouter.post("/login", async (req, res, next) => {
    try {

        const logUser = new CredentialsModel(req.body);
        const user = await loginUser(logUser);
        return res.json(user);

    } catch (error) {
        next(error);
    }
});



userRouter.get("/users/info", verifyRole(Role.User), async (req: Request | any, res: Response, next: NextFunction) => {
    try {

        const id = req.tokenData.id
        const users = await getUserInfo(id);
        return res.json(users);
    } catch (error) {
        next(error)
    }
})


