import Role from "./role";

export default interface UserModel {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role

}
