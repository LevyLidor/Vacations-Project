import React, { ComponentState, useEffect, useState } from "react";
import { Form, Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoUser from "../../models/infoUser";
import VacationsModel from "../../models/vacations-model";
import vacationServices from "../../services/vacationServices";
import CreateNewVacation from "./Admin/createNewVacation/createNewVacation";
import VacationCard from "./vacationCard";
import Role from "../../models/role";


const Vac = () => {

    const pageSize = 10;
    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState<string>("all");


    const info: InfoUser = useSelector((state: ComponentState) => state.userReducer);
    const nav = useNavigate();

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };


    const getAllVacations = async () => {
        try {

            if (selectedFilter === "all") {
                await vacationServices.getAllVacations(currentPage)
                    .then((res) => {
                        setVacations(res?.vacations);
                        setTotalPages(Math.ceil(res?.countOfAllVacations / pageSize));
                    })

            } else if (selectedFilter === 'userLikes') {
                await vacationServices.getAllVacationsLikes(currentPage)
                    .then((res) => {
                        setVacations(res?.vacationsLikes);
                        setTotalPages(Math.ceil(res?.totalVacationsLikes / pageSize));
                    })

            } else if (selectedFilter === 'notStarted') {
                await vacationServices.getVacationsNotStarted(currentPage)
                    .then((res) => {
                        setVacations(res?.vacationsNotStarted);
                        setTotalPages(Math.ceil(res?.totalVacationsNotStarted / pageSize));
                    })

            } else if (selectedFilter === 'startedNotEnded') {
                await vacationServices.getVacationsStartedNotEnded(currentPage)
                    .then((res) => {
                        setVacations(res?.vacationsStartedNotEnded);
                        setTotalPages(Math.ceil(res?.totalVacationsStartedNotEnded / pageSize));
                    })
            }

        } catch (error: any) {
            console.log(error.response.data);
            if (error.response.status === 401) {
                alert('Invalid or expired token! \n Please login again');
                nav("/logout");
            }
        }
    };



    useEffect(() => {
        getAllVacations();
    }, [currentPage, totalPages, refresh, selectedFilter]);



    const renderPageButtons = () => {
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageClick(i)}>
                    {i}
                </Pagination.Item>
            );
        }
        return pageButtons;
    };



    const filterOptions = [
        { value: "all", label: "All vacations" },
        { value: "userLikes", label: "Your likes" },
        { value: "notStarted", label: "Not started" },
        { value: "startedNotEnded", label: "Started and not ended" },
    ];


    return (
        <>

            <div className="vac">
                {info?.user?.role == Role.Admin &&
                    <CreateNewVacation refresh={refresh} setRefresh={setRefresh} />}

                {info?.user?.role == Role.User &&
                        <div className="vacationsFilter">
                            <span>Vacation Filters:</span>
                            <Form.Select value={selectedFilter} onChange={(e) => { setSelectedFilter(e.target.value), setCurrentPage(1) }} 
                            className='filterVac'>
                                {filterOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>}


                <div className="vacation-cards-container">
                    {vacations.map((vacation: VacationsModel, index: number ) => {
                        return (
                            <VacationCard
                                key={vacation.id}
                                id={vacation.id}
                                imageName={vacation.imageName}
                                startDate={vacation.startDate}
                                endDate={vacation.endDate}
                                description={vacation.description}
                                price={vacation.price}
                                destination={vacation.destination}
                                totalLikes={vacation.totalLikes}
                                userLikes={vacation.userLikes}
                                refresh={refresh}
                                setRefresh={setRefresh}
                            />
                        );
                    })}
                </div>


                <div className="pagination">
                    {renderPageButtons()}
                </div>
            </div>
        </>
    )
}

export default Vac




