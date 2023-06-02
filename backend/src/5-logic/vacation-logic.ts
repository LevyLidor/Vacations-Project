import { v4 as uuid } from "uuid";
import { OkPacket } from "mysql2/promise";
import { execute } from "../2-utils/dal";
import ErrorModel from "../4-models/error-modle";
import VacationsModel from "../4-models/vacations-model";
import safeDelete from "../7-helpers/safe-delete";



export async function getAll(limit: number, page: number, idUser: number) {

    // countOfAllVacations
    const query1 = `SELECT COUNT(*) AS count FROM vacations.vacations`;
    const [rows1] = await execute<{ count: number }[]>(query1);


    const offset = (page - 1) * limit;

    //AllVacations
    const query2 = `SELECT id, destination, description , startDate, endDate, price, imageName ,
    (select vl.idUser from followers vl where vl.idUser = ? and vl.idVacation = v.id) as 'userLikes',
    (select count(*) from followers where followers.idVacation = v.id) as 'totalLikes'
    from vacations.vacations v
    ORDER BY startDate ASC
    LIMIT ${limit} OFFSET ${offset}`;
    const [rows2] = await execute<VacationsModel[]>(query2, [idUser]);
    if (rows2.length === 0) throw new ErrorModel(404, 'Vacations not found');


    return { vacations: rows2, countOfAllVacations: rows1[0].count }
}


//Vacations Filter//
export async function getVacationsLikes(limit: number, page: number, idUser: number) {

    // countOfAllVacations
    const query1 = ` SELECT COUNT(*) AS count
     FROM vacations.vacations v
     JOIN followers vl ON vl.idVacation = v.id
     WHERE vl.idUser = ?`;
    const [rows1] = await execute<{ count: number }[]>(query1, [idUser]);

    const offset = (page - 1) * limit;

    const query = `SELECT v.id, v.destination, v.description, v.startDate, v.endDate, v.price, v.imageName,
    (select vl.idUser from followers vl where vl.idUser = ? and vl.idVacation = v.id) as 'userLikes',
    (select count(*) from followers where followers.idVacation = v.id) as 'totalLikes'
    FROM vacations.vacations v
    JOIN followers vl ON vl.idVacation = v.id
    WHERE vl.idUser = ?
    ORDER BY startDate ASC
    LIMIT ${limit} OFFSET ${offset}`;
    const [rows] = await execute<VacationsModel[]>(query, [idUser, idUser]);


    return { vacationsLikes: rows, totalVacationsLikes: rows1[0].count };
}



export async function getVacationsNotStarted(limit: number, page: number, idUser: number) {

    // countOfAllVacations
    const query1 = `SELECT COUNT(*) AS count FROM vacations.vacations v WHERE startDate > NOW();`;
    const [rows1] = await execute<{ count: number }[]>(query1);


    const offset = (page - 1) * limit;

    const query = `SELECT v.id, v.destination, v.description, v.startDate, v.endDate, v.price, v.imageName,
    (select vl.idUser from followers vl where vl.idUser = ? and vl.idVacation = v.id) as 'userLikes',
    (select count(*) from followers where followers.idVacation = v.id) as 'totalLikes'
    FROM vacations.vacations v
    WHERE startDate > NOW()
    ORDER BY startDate ASC
    LIMIT ${limit} OFFSET ${offset}`;
    const [rows] = await execute<VacationsModel[]>(query, [idUser]);


    return { vacationsNotStarted: rows, totalVacationsNotStarted: rows1[0].count };
}


export async function getVacationsStartedNotEnded(limit: number, page: number, idUser: number) {

    // countOfAllVacations
    const query1 = `SELECT COUNT(*) AS count FROM vacations.vacations v WHERE startDate <= NOW() AND endDate > NOW();`;
    const [rows1] = await execute<{ count: number }[]>(query1);


    const offset = (page - 1) * limit;

    const query = `SELECT v.id, v.destination, v.description, v.startDate, v.endDate, v.price, v.imageName,
    (select vl.idUser from followers vl where vl.idUser = ? and vl.idVacation = v.id) as 'userLikes',
    (select count(*) from followers where followers.idVacation = v.id) as 'totalLikes'
    FROM vacations.vacations v
    WHERE startDate <= NOW() AND endDate > NOW()
    ORDER BY startDate ASC
    LIMIT ${limit} OFFSET ${offset}`;
    const [rows] = await execute<VacationsModel[]>(query, [idUser]);


    return { vacationsStartedNotEnded: rows, totalVacationsStartedNotEnded: rows1[0].count };
}



// add/delete likes //
export async function postFollowers(idVacation: number, idUser: number) {

    const query = 'INSERT INTO `vacations`.`followers` (`idVacation`, `idUser`) VALUES (?, ?);';
    await execute<OkPacket>(query, [idVacation, idUser]);

    return {
        idVacation,
        idUser
    }
}


export async function deleteFollowers(idVacation: number, idUser: number) {

    const query = 'DELETE FROM `vacations`.`followers` WHERE (`idVacation` = ?) and (`idUser` = ?);';
    await execute<OkPacket>(query, [idVacation, idUser]);
}




export async function createNewVacation(vacation: VacationsModel) {

    const errors = vacation.validatePost();
    if (errors) throw new ErrorModel(400, errors);

    const extension = vacation.image.name.substr(vacation.image.name.lastIndexOf(".")); //  תביא לי את סיומת התמונה // ".jpg" / ".png"
    vacation.imageName = uuid() + extension; // uuid() מג'נרט שם לתמונה בעזרת 
    await vacation.image.mv('./src/images/vacations/' + vacation.imageName); // seve the image to the path + the name we ganeret with { uuid() = v4() }
    delete vacation.image.data;

    const query = `INSERT INTO vacations.vacations
     ( destination, description, startDate ,endDate , price , image , imageName)
     VALUES (?, ? ,? ,? ,? ,? ,?)`;
    const [rows] = await execute<OkPacket>(query, [vacation.destination, vacation.description, vacation.startDate,
         vacation.endDate, vacation.price, vacation.image, vacation.imageName]);
    const id = rows.insertId;


    return {
        id,
        destination: vacation.destination,
        description: vacation.description,
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        price: vacation.price,
        imageName: vacation.imageName,
    };

}



export async function updateVacation(vacation: VacationsModel) {

    const errors = vacation.validatePut();
    if (errors) throw new ErrorModel(400, errors);

    const query1 = "SELECT * FROM vacations.vacations WHERE id = ?;";
    const [rows1] = await execute<VacationsModel>(query1, [vacation.id]);
    if (rows1.length === 0) throw new ErrorModel(404, `Bad id: ${vacation.id} Not Found`);


    if (vacation.image) {
        safeDelete('./src/images/vacations/' + rows1[0].imageName); // delete the old image
        const extension = vacation.image.name.substr(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension; // give a new name for the image
        await vacation.image.mv("./src/images/vacations/" + vacation.imageName); // save the new name
        delete vacation.image.data; // delete the new image object 
    } else {
        vacation.image = rows1[0].image;
        vacation.imageName = rows1[0].imageName
    }


    const query = `UPDATE vacations.vacations SET destination = ?
     ,description = ?, startDate = ?,endDate = ? , price = ? , image = ? , imageName = ?
      WHERE (id = ?)`;
    await execute<OkPacket>(query,
         [vacation.destination, vacation.description, vacation.startDate, vacation.endDate,
             vacation.price, vacation.image, vacation.imageName, vacation.id]);

    return {
        id: vacation.id,
        destination: vacation.destination,
        description: vacation.description,
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        price: vacation.price,
        image: vacation?.image,
        imageName: vacation?.imageName
    }

}




export async function deleteVacation(id: number) {

    const query1 = "SELECT * FROM vacations.vacations WHERE id = ?;";
    const [rows1] = await execute<VacationsModel>(query1, [id]);
    if (rows1.length === 0) throw new ErrorModel(404, `Bad id: ${id} Not Found`);
    safeDelete('./src/images/vacations/' + rows1[0]?.imageName); // delete the image

    const query = "DELETE FROM vacations.vacations WHERE id = ?";
    await execute<OkPacket>(query, [id]);

}



export async function chartDetails() {

    const query = `SELECT  destination,
    (select count(*) from followers where followers.idVacation = v.id) as 'totalLikes'
    from vacations.vacations v;` ;
    const [rows] = await execute<OkPacket>(query);

    return rows;
}





