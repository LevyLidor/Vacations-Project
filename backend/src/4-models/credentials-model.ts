import Joi from "../../node_modules/joi/lib/index";

class CredentialsModel {
    email: string;
    password: string;

    constructor(Credentials: CredentialsModel) {
        this.email = Credentials.email
        this.password = Credentials.password;
    };

    public validatePost() {
        const result = CredentialsModel.postValidationSchema.validate(this);
        return result.error?.message;
    };

    private static postValidationSchema = Joi.object({
        email: Joi.string().email().required().min(4).max(100),
        password: Joi.string().required().min(4).max(100),
    });

} 


export default CredentialsModel;