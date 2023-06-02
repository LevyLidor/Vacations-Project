import React, { useState } from 'react'
import FormData from 'form-data'
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import VacationsModel from '../../../../models/vacations-model';
import vacationServices from '../../../../services/vacationServices';
import './EditVacation.css';


const EditVacation = ({ imageName, startDate, endDate, description, price, destination, id, refresh, setRefresh }: VacationsModel) => {

    const { getValues, register, handleSubmit, formState: { errors }, reset } = useForm<VacationsModel>();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errMsg, setEerrMsg] = useState(null);
    const [imageURL, setImageURL] = useState<string | null>(null);


    const handleClose = () => { setShow(false); setImageURL(null); reset(), setEerrMsg(null) };
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

            await vacationServices.editVacation(id, fromData).then(() => {
                setTimeout(() => {
                    setEerrMsg(null);
                    setLoading(false);
                    setShow(false);
                    setRefresh(!refresh);
                }, 1000)
            })

        } catch (error: any) {
            if (error.response.status === 401) {
                alert('Invalid or expired token! \n Please login again');
                nav("/logout");
            }

            if (error) {
                console.log("erREG", error);
                setLoading(false);
                setShow(true)
                setEerrMsg(error.response.data)
            }
        }
    }


    return (
        <>
            <Button variant="dark" onClick={handleShow}> Edit 📝 </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='text-center'>
                    <Modal.Title className='editTitle'>Update Vacation</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className='form-editVacation' onSubmit={handleSubmit(addVacation)}>
                        <Form.Group className="mb-3 editDateModal" controlId="formBasicStartDate">
                            <div>
                                <Form.Label className='editLabel'>Start Date</Form.Label>
                                <Form.Control type="date" defaultValue={`${format(new Date(startDate), "yyyy-MM-dd")}`}
                                    {...register("startDate", {
                                        required: { value: true, message: 'Start Date is required' }
                                    })} />
                                {errors.startDate?.message && <span className='errMsg'>{errors.startDate.message}</span>}
                            </div>
                            <div>
                                <Form.Label className='editLabel'>End Date</Form.Label>
                                <Form.Control type="date" defaultValue={`${format(new Date(endDate), "yyyy-MM-dd")}`}
                                    {...register("endDate", {
                                        required: { value: true, message: 'End Date is required' }
                                    })} />
                                {errors.endDate?.message && <span className='errMsg'>{errors.endDate.message}</span>}
                            </div>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicDestination">
                            <Form.Label className='editLabel'>Destination</Form.Label>
                            <Form.Control type="text" placeholder="Enter Destination" defaultValue={destination} {...register("destination", {
                                required: { value: true, message: 'Destination is required' },
                                minLength: { value: 2, message: 'Destination length must be at least 2 characters long' },
                                maxLength: { value: 45, message: 'Destination length must be less than or equal to 45 characters long' }
                            })} />
                            {errors.destination?.message && <><span className='errMsg'>{errors.destination.message}</span><br /></>}

                            <Form.Label className='mt-2 editLabel'>Description</Form.Label>
                            <Form.Control type="text" as="textarea" placeholder="Enter Description" defaultValue={description} {...register("description", {
                                required: { value: true, message: 'Description is required' },
                                minLength: { value: 2, message: 'Description length must be at least 2 characters long' },
                                maxLength: { value: 255, message: 'Description length must be less than or equal to 255 characters long' }
                            })} />
                            {errors.description?.message && <><span className='errMsg'>{errors.description.message}</span><br /></>}

                            <Form.Label className='mt-2 editLabel'>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" defaultValue={price} {...register("price", {
                                required: { value: true, message: 'Price is required' },
                                min: { value: 1, message: 'Min Price must be at least $1' },
                                max: { value: 10000, message: 'Max Price must be less than or equal to $10000 ' }
                            })} />
                            {errors.price?.message && <span className='errMsg'>{errors.price.message}</span>}
                        </Form.Group>

                        <Form.Group onChange={handleFileChange} className="mb-3" controlId="formFile">
                            <Form.Label className='editLabel'>Image</Form.Label>
                            <Form.Control type="file" accept='image/*' {...register("image")} />
                            {errors.image?.message && <span className='errMsg'>{errors.image.message}</span>}
                            <div> {imageURL ? (
                                <img src={imageURL} alt="Selected file" className='imgUrl' />)
                                : <img src={`http://localhost:3005/images/${imageName}`} alt={destination} className='imgUrl'></img>}</div>
                        </Form.Group>


                        {errMsg !== null ? <p className='errMsg'>{errMsg}</p>
                            : <></>}
                        {loading ?
                            <div className='spinner'>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner></div>
                            : <></>}


                        <Modal.Footer className='editFooter'>
                            <Button type='button' variant="danger" onClick={handleClose}> Close </Button>
                            <Button type='submit' variant="success"> Update Vacation </Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}


export default EditVacation



