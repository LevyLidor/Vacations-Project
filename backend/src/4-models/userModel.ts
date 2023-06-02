import Joi from "joi";
import Role from "./role";

export class UserModel {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role


    constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;

    };

    public validatePost() {
        const result = UserModel.postValidationSchema.validate(this);
        return result.error?.message;
    }
 
    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        email: Joi.string().email().required().min(4).max(100),
        password: Joi.string().required().min(4).max(100),
        role: Joi.number().integer().positive().optional()
    });

}
