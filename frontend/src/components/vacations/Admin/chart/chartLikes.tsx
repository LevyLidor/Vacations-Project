import React, { ComponentState, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import InfoUser from '../../../../models/infoUser';
import vacationServices from '../../../../services/vacationServices';
import BarChart from './chart';
import { CSVLink } from "react-csv";
import './chart.css';
import Role from '../../../../models/role';


interface Cahrt {
    destination: string;
    totalLikes: number
}

const ChartLikes = () => {

    const info: InfoUser = useSelector((state: ComponentState) => state.userReducer);
    const dateString = new Date().toLocaleString().substring(0, 16);

    const [val, setVal] = useState<Cahrt[]>();
    const [numberCart, setNumberCart] = useState<number[] | any>();
    const [stringChart, setStringChart] = useState<string[] | any>([]);
    const nav = useNavigate();

    const getValChart = async () => {
        try {
            await vacationServices.chartDetails()
                .then((res) => setVal(res));
        } catch (error: any) {
            if (error.response.status === 401) {
                nav('logout');
            }
        }
    }

    useEffect(() => {
        getValChart();
    }, [])


    useEffect(() => {
        const stringLabels = val?.map((val) => val.destination);
        const numberData = val?.map((val) => val.totalLikes);

        setStringChart(stringLabels);
        setNumberCart(numberData);
    }, [val])


    return (
        <div>

            {info?.user?.role == Role.Admin &&
                <>
                    <h3 className='titleChart'>Report Vacations Likes</h3>

                    <div className='btnCsv'>
                        <CSVLink data={val ? val : []}
                            filename={`Chart-Details-${dateString}.csv`}
                            className="btn btn-outline-dark">Download CSV Details</CSVLink>
                    </div>

                    <div className='chartLikes'>
                        <BarChart data={numberCart} labels={stringChart} />
                    </div>

                </>}
        </div>
    )
}

export default ChartLikes