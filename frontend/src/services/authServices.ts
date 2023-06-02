import axios from "axios"
import config from "../utils/config"


class AuthServices {
    
    async login(email: string, password: string) {
        const { data } = await axios.post(config.LOGIN_ROUTE, { email, password })
        return data;
    };

    async register(firstName: string, lastName: string, email: string, password: string ) {
        const { data } = await axios.post(config.Register_ROUTE, { firstName, lastName, email, password })
        return data;
    };
}

const authServices = new AuthServices();
export default authServices;