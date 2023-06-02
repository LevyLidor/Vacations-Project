import axios from "axios";
import config from "../utils/config";
import FormData from 'form-data'


class VacationServices {

    async getAllVacations(currentPage: number) {
        const { data } = await axios.get(`${config.GET_ALL_VACATIONS_ROUTE}?page=${currentPage}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`
            }
        })

        return data;
    }


    async getAllVacationsLikes(currentPage: number) {
        const { data } = await axios.get(`${config.GET_ALL_VACATIONS_LIKES_ROUTE}?page=${currentPage}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`
            }
        })

        return data
    }

    async getVacationsNotStarted(currentPage: number) {
        const { data } = await axios.get(`${config.GET_ALL_VACATIONS_NOT_STARTED_ROUTE}?page=${currentPage}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`
            }
        })

        return data
    }

    async getVacationsStartedNotEnded(currentPage: number) {
        const { data } = await axios.get(`${config.GET_ALL_VACATIONS_STARTED_AND_NOT_END_ROUTE}?page=${currentPage}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`
            }
        })

        return data
    }



    async postFollowers(idVacation: number) {
        try {

            const { data } = await axios.post(config.POST_FOLLOWERS_VACATION_ROUTE + idVacation, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`
                }
            });
            return data;

        } catch (error) {
            console.log(error)
        }
    }

    async deleteFollowers(idVacation: number) {
        try {

            const { data } = await axios.delete(config.POST_FOLLOWERS_VACATION_ROUTE + idVacation, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`
                }
            });
            return data;

        } catch (error) {
            console.log(error);
        }
    }



    async createNewVacation(fromData: FormData) {
        const { data } = await axios.post(config.ADD_VACATION_ROUTH, fromData, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=--------------------------a string of numbers that is never the same',
                'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`,
                Accept: 'application/json, text/plain, */*',
            }
        })
        return data;
    }

    async editVacation(id: number, fromData: FormData) {
        const { data } = await axios.put(config.EDIT_VACATION_ROUTE + id, fromData, {
            headers: {
                'Content-Type': 'multipart/form-data;',
                'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`,
                Accept: 'application/json, text/plain, */*',
            }
        })
        return data;
    }


    async deleteVacation(idVacation: number) {

        try {
            const { data } = await axios.delete(config.DELETE_VACATION_ROUTE + idVacation, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`
                }
            });
            return data;

        } catch (error) {
            console.log(error);
        }
    }


    async chartDetails() {
        const { data } = await axios.get(config.GET_CHART_DETAILS_ROUTH, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`
            }
        })
        return data
    }

}

const vacationServices = new VacationServices();
export default vacationServices