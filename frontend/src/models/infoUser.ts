import Role from "./role";

interface InfoUser {
    user: {
        id: number,
        firstName: string,
        email: string,
        role: Role
    }
}

export default InfoUser;