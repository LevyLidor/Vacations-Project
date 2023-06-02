class AppConfig {
    API_URL = 'http://localhost:3005/api/';
    TOKEN_KEY = 'token';


    // * AUTH ROUTES * //
    Register_ROUTE = this.API_URL + 'register';
    LOGIN_ROUTE = this.API_URL + 'login';
    /////////////////////////////////////////


    // * ADMIN ROUTES * //
    ADD_VACATION_ROUTH = this.API_URL + 'vacation';
    EDIT_VACATION_ROUTE = this.API_URL + 'vacation/'; //!NEED VACATION ID PARAM
    DELETE_VACATION_ROUTE = this.API_URL + 'vacation/'; //!NEED VACATION ID PARAM
    GET_CHART_DETAILS_ROUTH = this.API_URL + 'chart';
    /////////////////////////////////////////////


    // * USER ROUTES * //
    GET_ALL_VACATIONS_ROUTE = this.API_URL + 'vacation' // ADD " ?page='numberOfPage' " ;
    POST_FOLLOWERS_VACATION_ROUTE = this.API_URL + 'vacatioin/followers/' // NEED idVacation;
    DELETE_FOLLOWERS_VACATION_ROUTE = this.API_URL + 'vacatioin/followers/' // NEED idVacation;
    // vacations filter //
    GET_ALL_VACATIONS_LIKES_ROUTE = this.API_URL + 'vacationLikes' // ADD " ?page='numberOfPage' " ;
    GET_ALL_VACATIONS_NOT_STARTED_ROUTE = this.API_URL + 'vacationsNotStarted' // ADD " ?page='numberOfPage' " ;
    GET_ALL_VACATIONS_STARTED_AND_NOT_END_ROUTE = this.API_URL + 'vacationsStartedNotEnded' // ADD " ?page='numberOfPage' " ;
    ////////////////////////////////////////////////

    USER_INFO = this.API_URL + 'users/info';
}

const config = new AppConfig();
export default config;