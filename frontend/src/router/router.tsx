import { ComponentState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/auth/login';
import Register from '../components/auth/register';
import Vac from '../components/vacations/vacations';
import { useSelector } from 'react-redux';
import ChartLikes from '../components/vacations/Admin/chart/chartLikes';
import InfoUser from '../models/infoUser';
import Logout from '../components/auth/logout';
import Home from '../components/home';
import '../index.css';


function AppRoutes() {

    const info: InfoUser = useSelector((state: ComponentState) => state.userReducer);
    const rootElement = document.getElementById('body');

    info.user && rootElement ? rootElement.className = 'userClass'
        : !info.user && rootElement ? rootElement.className = 'loginClass'
            : <></>;


    return (
        <Router >
            <Home />

            {info.user ?
                <Routes>
                    <Route path="/" element={<Vac />} />
                    <Route path="/login" element={<Vac />} />
                    <Route path="/register" element={<Vac />} />
                    <Route path="/vacations" element={<Vac />} />
                    <Route path="/chart" element={<ChartLikes />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Vac />} />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/vacations" element={<Login />} />
                    <Route path="/chart" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Login />} />
                </Routes>}
        </Router >
    );
}


export default AppRoutes;