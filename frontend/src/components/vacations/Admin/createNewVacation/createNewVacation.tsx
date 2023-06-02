import React, { useState } from 'react'
import FormData from 'form-data'
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import VacationsModel from '../../../../models/vacations-model';
import vacationServices from '../../../../services/vacationServices';
import './CreateNewVacation.css'


const CreateNewVacation = ({ refresh, setRefresh }: { refresh: boolean, setRefresh: (e: boolean) => void }) => {

    const [show, setShow] = useState(false);
    const { getValues, register, handleSubmit, formState: { errors }, reset } = useForm<VacationsModel>();
    const [loading, setLoading] = useState(false);
    const [errMsg, setEerrMsg] = useState(null);
    const [imageURL, setImageURL] = useState<string | null>(null);


    const handleClose = () => { setShow(false); setImageURL(null); setEerrMsg(null); reset() };
    const handleShow = () => setShow(true);
    const nav = useNavigate();


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const objectURL = URL.createObjectURL(files[0]);
            setImageURL(objectURL);
        }
    };


    async function addVacation(_body: VacationsModel) {
        setLoading(true)
        try {

            const fromData = new FormData();
            fromData.append("destination", _body.destination);
            fromData.append("description", _body.description);
            fromData.append("startDate", _body.startDate.toString());
            fromData.append("endDate", _body.endDate.toString());
            fromData.append("price", _body.price.toString());
            if (_body.image && _body.image[0]) {
                fromData.append("image", _body.image[0]);
            }

            await vacationServices.createNewVacation(fromData)
                .then(() => {
                    setTimeout(() => {
                        setEerrMsg(null);
                        setLoading(false);
                        setShow(false);
                        setRefresh(!refresh);
                        reset();
                        setImageURL(null);
                    }, 1000);
                })

        } catch (error: any) {
            if (error.response.status === 401) {
                alert('Invalid or expired token! \n Please login again');
                nav("/logout");
            }

            if (error) {
                console.log(error);
                setLoading(false);
                setShow(true)
                setEerrMsg(error.response.data)
            }
        }
    }


    return (
        <>
            <Button variant="dark" onClick={handleShow} className='createBtn'> Create New Vacation </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='text-center'>
                    <Modal.Title className='createTitle' >Create New Vacation</Modal.Title>
                </Modal.Header>
                <Modal.Body >


                    <Form className='form-newVacation' onSubmit={handleSubmit(addVacation)}>

                        <Form.Group className="mb-3 creatDateModal" controlId="formBasicStartDate" >
                            <div>
                                <Form.Label className='createLabel'>Start Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Start Date" {...register("startDate", {
                                    required: { value: true, message: 'Start Date is required' }
                                })} />
                                {errors.startDate?.message && <span className='errMsg'>{errors.startDate.message}</span>}
                            </div>
                            <div>
                                <Form.Label className='createLabel'>End Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter end Date" {...register("endDate", {
                                    required: { value: true, message: 'End Date is required' }
                                })} />
                                {errors.endDate?.message && <span className='errMsg'>{errors.endDate.message}</span>}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDestination" >
                            <Form.Label className='createLabel'>Destination</Form.Label>
                            <Form.Control type="text" placeholder="Enter Destination" {...register("destination", {
                                required: { value: true, message: 'Destination is required' },
                                minLength: { value: 2, message: 'Destination length must be at least 2 characters long' },
                                maxLength: { value: 45, message: 'Destination length must be less than or equal to 45 characters long' }
                            })} />
                            {errors.destination?.message && <><span className='errMsg'>{errors.destination.message}</span> <br /></>}

                            <Form.Label className='mt-2 createLabel'>Description</Form.Label>
                            <Form.Control type="text" as="textarea" placeholder="Enter Description" {...register("description", {
                                required: { value: true, message: 'Description is required' },
                                minLength: { value: 2, message: 'Description length must be at least 2 characters long' },
                                maxLength: { value: 255, message: 'Description length must be less than or equal to 255 characters long' }
                            })} />
                            {errors.description?.message && <><span className='errMsg'>{errors.description.message}</span><br /></>}


                            <Form.Label className='mt-2 createLabel'>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" {...register("price", {
                                required: { value: true, message: 'Price is required' },
                                min: { value: 1, message: 'Min Price must be at least $1' },
                                max: { value: 10000, message: 'Max Price must be less than or equal to $10000 ' }
                            })} />
                            {errors.price?.message && <span className='errMsg'>{errors.price.message}</span>}
                        </Form.Group>


                        <Form.Group onChange={handleFileChange} className="mb-3" controlId="formFile">
                            <Form.Label className='createLabel'>Image</Form.Label>
                            <Form.Control type="file" accept='image/*'
                                {...register("image", { required: { value: true, message: "Image is required" } })} />
                            {errors.image?.message && <span className='errMsg'>{errors.image.message}</span>}
                            <div> {imageURL && (
                                <img src={imageURL} alt="Selected file" className='imgUrl' />)}</div>
                        </Form.Group>


                        {errMsg !== null ? <p className='errMsg'>{errMsg}</p>
                            : <></>}
                        {loading ?
                            <div className='spinner'>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner></div>
                            : <></>}


                        <Modal.Footer className='createFooter'>
                            <Button type='button' variant="danger" onClick={handleClose}> Close </Button>
                            <Button type='submit' variant="success"> Add Vacation </Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}



export default CreateNewVacation