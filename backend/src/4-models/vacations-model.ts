import { UploadedFile } from "express-fileupload";
import Joi from "joi";


const date = new Date();
const dateString = date.toISOString().substring(0, 10);


class VacationsModel {

    id: number;
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageName: string;
    image: UploadedFile



    constructor(vacations: VacationsModel) {
        this.id = vacations.id;
        this.destination = vacations.destination;
        this.description = vacations.description;
        this.startDate = vacations.startDate;
        this.endDate = vacations.endDate;
        this.price = vacations.price;
        this.imageName = vacations.imageName;
        this.image = vacations.image;
    }

    public validatePost() {
        const result = VacationsModel.postValidationSchema.validate(this);
        return result.error?.message;
    };

    public validatePut() {
        const result = VacationsModel.putValidationSchema.validate(this);
        return result.error?.message;
    }


    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        destination: Joi.string().required().min(2).max(45),
        description: Joi.string().required().min(2).max(255),
        startDate: Joi.date().min(dateString).required().error(new Error(`Start Date must be greater than or equal to ${dateString}`)),
        endDate: Joi.date().greater(Joi.ref("startDate")).required().error(new Error('End Date must be greater than Start Date')),
        price: Joi.number().required().min(1).max(10000),
        imageName: Joi.string().optional().min(5).max(100),
        image: Joi.object().required()
    });


    private static putValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        destination: Joi.string().optional().min(2).max(45),
        description: Joi.string().optional().min(2).max(255),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional().greater(Joi.ref("startDate")).error(new Error('End Date must be greater than Start Date')),
        price: Joi.number().optional().min(1).max(10000),
        imageName: Joi.string().optional().min(5).max(100),
        image: Joi.object().optional()
    });

}

export default VacationsModel;

