import { NextFunction, Request, Response, Router } from "express";
import verifyRole from "../3-middleware/verify-role";
import Role from "../4-models/role";
import VacationsModel from "../4-models/vacations-model";
import { chartDetails, createNewVacation, deleteFollowers, deleteVacation, getAll, getVacationsLikes, getVacationsNotStarted, getVacationsStartedNotEnded, postFollowers, updateVacation } from "../5-logic/vacation-logic";


export const vacationRouter = Router();


vacationRouter.get("/vacation", verifyRole(Role.User) , async (req : Request | any, res, next) => {

    try {
        const limit = +req.query.limit || 10;
        const page = +req.query.page || 1;
        const idUser = req.tokenData.id;

        const vacations = await getAll(limit , page ,idUser);
        return res.json(vacations);

    } catch (error) {
        next(error);
    } 
});


vacationRouter.get("/vacationLikes", verifyRole(Role.User) , async (req : Request | any, res, next) => {

    try {
        const limit = +req.query.limit || 10;
        const page = +req.query.page || 1;
        const idUser = req.tokenData.id;

        const vacations = await getVacationsLikes(limit , page ,idUser);
        return res.json(vacations);

    } catch (error) {
        next(error);
    } 
});

vacationRouter.get("/vacationsNotStarted", verifyRole(Role.User) , async (req : Request | any, res, next) => {

    try {
        const limit = +req.query.limit || 10;
        const page = +req.query.page || 1;
        const idUser = req.tokenData.id;

        const vacations = await getVacationsNotStarted(limit , page ,idUser);
        return res.json(vacations);

    } catch (error) {
        next(error);
    } 
});


vacationRouter.get("/vacationsStartedNotEnded", verifyRole(Role.User) , async (req : Request | any, res, next) => {

    try {
        const limit = +req.query.limit || 10;
        const page = +req.query.page || 1;
        const idUser = req.tokenData.id;

        const vacations = await getVacationsStartedNotEnded(limit , page ,idUser);
        return res.json(vacations);

    } catch (error) {
        next(error);
    } 
});



vacationRouter.get("/chart" , verifyRole(Role.Admin) , async(req ,res , next) => {
    try {
        
        const chart = await chartDetails();
        return res.json(chart)

    } catch (error) {
        next(error)
    }
})




vacationRouter.post("/vacatioin/followers/:idVacation([0-9]+)" , verifyRole(Role.User) , async (req :Request | any , res , next) =>{
    try {
        const idUser = req.tokenData.id;
        const idVacation = req.params.idVacation;

        const followVacation = await postFollowers(idVacation , idUser);
       return  res.json(followVacation);
      
    } catch (error) {
        next(error)
    }
})


vacationRouter.delete("/vacatioin/followers/:idVacation([0-9]+)" , verifyRole(Role.User) , async (req :Request | any , res , next) =>{
    try {
        const idUser = req.tokenData.id;
        const idVacation = req.params.idVacation;

       await deleteFollowers(idVacation , idUser);
       res.status(204).send(" message: 'Like deleted successfully' ");
      
    } catch (error) {
        next(error)
    }
})


vacationRouter.post("/vacation", verifyRole(Role.Admin), async (req, res, next) => {

    try { 
        
        req.body.image = req.files?.image;
        
        const vacation = new VacationsModel(req.body);
        const newNote = await createNewVacation(vacation);

        return res.json(newNote);

    } catch (error) {
        next(error);
    }

});


vacationRouter.put("/vacation/:id([0-9]+)", verifyRole(Role.Admin), async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.id = +request.params.id;
        request.body.image = request.files?.image; 

        const vacationToUpdate: VacationsModel = new VacationsModel(request.body);
        const vacation = await updateVacation(vacationToUpdate);

        return response.json(vacation);

    } catch (error) {
        next(error);
    };
});


vacationRouter.delete("/vacation/:id([0-9]+)", verifyRole(Role.Admin), async (request: Request, response: Response, next: NextFunction) => {

    try {

        const id = +request.params.id;
 
        await deleteVacation(id); 
        response.status(204).send(" message: 'Vacation deleted successfully' ");

    } catch (error) {
        next(error);
    }
});


