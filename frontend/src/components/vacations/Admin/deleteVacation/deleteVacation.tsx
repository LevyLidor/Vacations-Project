import React, { useState } from 'react'
import { Button, Alert } from 'react-bootstrap';
import vacationServices from '../../../../services/vacationServices';
import './DeleteVacation.css';

interface DeleteVacationProps {
    id: number;
    refresh?: boolean;
    setRefresh: (e: boolean) => void;
}

const DeleteVacation = ({ id, refresh, setRefresh }: DeleteVacationProps) => {

    const [show, setShow] = useState(false);


    const deleteVacation = async () => {
        try {
            await vacationServices.deleteVacation(id)
            console.log("done");
            setRefresh(!refresh)

        } catch (error) {
            console.log("errMag ", error);
        }
    };


    return (
        <div className='Divdelete'>
            <Alert show={show} variant="danger" className='alertDelete'>

                <Alert.Heading className='text-center'>Delete Vacation</Alert.Heading>
                <p className='text-center'> Are you sure you want to delete this vacation? </p>
                <hr />

                <div className='divBtnDelete'>
                    <Button onClick={() => setShow(false)} variant="dark"> Close </Button>
                    <Button className='deleteBtn' onClick={() => {
                        setShow(false); console.log("delete");
                        deleteVacation()
                    }} variant="outline-danger"> Yes </Button>

                </div>
            </Alert>


            {!show &&
                <Button variant="dark" className='bold' id={id.toString()} onClick={() => setShow(true)}>Delete ❌</Button>
            }
        </div>
    )
}

export default DeleteVacation