import Role from "./role";

export default interface LoginModel {
    id: number;
    firstName: string;
    email: string;
    role: Role
}