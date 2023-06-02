import { OkPacket } from "mysql2/promise";
import { execute } from "../2-utils/dal";
import ErrorModel from "../4-models/error-modle";
import Role from "../4-models/role";
import { UserModel } from "../4-models/userModel";
import jwtHelper from '../7-helpers/jwt-helpers'
import bcrypt from "bcrypt";
import CredentialsModel from "../4-models/credentials-model";



export async function registerUser(regUser: UserModel) {

    const errors = regUser.validatePost();
    if (errors) throw new ErrorModel(400, errors)
    regUser.password = await bcrypt.hash(regUser.password, 10);

    const query1 = `SELECT * FROM vacations.users WHERE email = ? `;
    const [result1] = await execute<OkPacket>(query1, [regUser.email]);
    if (result1.length > 0) throw new ErrorModel(400, "User already exists with this email");

    const query = `INSERT INTO vacations.users( firstName, lastName, email, password ) VALUES(?, ? , ? , ? );`;
    const [result] = await execute<OkPacket>(query, [regUser.firstName, regUser.lastName, regUser.email, regUser.password]);

    regUser.id = result.insertId;
    regUser.role = Role.User;

    //Create JWT Token:
    const token = jwtHelper.getNewToken({ id: result.insertId, firstName: regUser.firstName, email: regUser.email, role: regUser.role });

    // Return Token:
    return token;
};



export async function loginUser(logUser: CredentialsModel) {
    const errors = logUser.validatePost();
    if (errors) throw new ErrorModel(400, errors);

    const query = `SELECT * FROM vacations.users WHERE email = ?`;
    const [result] = await execute<CredentialsModel>(query, [logUser.email]);
    if (result.length === 0) throw new ErrorModel(404, 'Invalid email or password');

    const isMatch = await bcrypt.compare(logUser.password, result[0].password);
    if (!isMatch) throw new ErrorModel(400, "Invalid email or password");

    //Create JWT Token:
    const token = jwtHelper.getNewToken({ id: result[0].id, firstName: result[0].firstName, email: result[0].email, role: result[0].role });

    // Return Token:
    return token;
};


export async function getUserInfo(id: number): Promise<UserModel> {
    const query = "SELECT * FROM vacations.users Where id = ?";
    const [rows] = await execute<UserModel>(query, [id]);

    delete rows[0].password;
    return rows;
};

