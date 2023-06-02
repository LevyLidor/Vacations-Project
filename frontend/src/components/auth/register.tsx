import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserModel from '../../models/userModel';
import { login } from '../../Redux/slice/userSlice';
import authServices from '../../services/authServices';
import config from '../../utils/config';
import "./form.css";


function Register() {

  const { getValues, register, handleSubmit, formState: { errors }, reset } = useForm<UserModel>();
  const [loading, setLoading] = useState(false);
  const [errMsg, setEerrMsg] = useState(null);
  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const nav = useNavigate();

  const [valToken, setValToken] = useState();
  const dispatch = useDispatch();


  function sub({ firstName, lastName, email, password }: UserModel) {
    setLoading(true);
    try {
      authServices.register(firstName, lastName, email, password).then((token) => {
        if (token) {
          setValToken(token)
          localStorage.setItem(config.TOKEN_KEY, token);

          setEerrMsg(null);

          setTimeout(() => {
            nav('/vacations');
            setLoading(false);
          }, 3000);
        }
      }).catch((error: any) => {
        if (error) {

          console.log("erREG", error);

          setLoading(false);
        }
        setEerrMsg(error.response.data);
      });

    } catch (error) {
      console.log(error);
    }
  }

  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      dispatch(login(valToken))
    }
  }, [token])

  return (

    <Form className='form-register' onSubmit={handleSubmit(sub)}>
      <h1 className='regTitle'>Register</h1>

      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control style={{ backgroundColor: "#f8f9fa87" }}
          type="text" placeholder="Enter First Name" {...register("firstName", {
            required: { value: true, message: 'First Name is required' },
            minLength: { value: 4, message: 'First Name length must be at least 4 characters long' },
            maxLength: { value: 100, message: 'First Name length must be less than or equal to 100 characters long' }
          })} />
        {errors.firstName?.message && <span className='errMsg'>{errors.firstName.message}</span>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control style={{ backgroundColor: "#f8f9fa87" }}
          type="text" placeholder="Enter Last Name" {...register("lastName", {
            required: { value: true, message: 'Last Name is required' },
            minLength: { value: 4, message: 'Last Name length must be at least 4 characters long' },
            maxLength: { value: 100, message: 'Last Name length must be less than or equal to 100 characters long' }
          })} />
        {errors.lastName?.message && <span className='errMsg'>{errors.lastName.message}</span>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control style={{ backgroundColor: "#f8f9fa87" }}
          type="email" placeholder="Enter Email" {...register("email", {
            required: { value: true, message: 'Email is required' },
            pattern: { value: emailReg, message: 'Invalid email' },
            minLength: { value: 4, message: 'Email length must be at least 4 characters long' },
            maxLength: { value: 100, message: 'Email length must be less than or equal to 100 characters long' }
          })} />
        {errors.email?.message && <span className='errMsg'>{errors.email.message}</span>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control style={{ backgroundColor: "#f8f9fa87" }}
          type="password" placeholder="Enter Password" {...register("password", {
            required: { value: true, message: 'Password is required' },
            minLength: { value: 4, message: 'password length must be at least 4 characters long' },
            maxLength: { value: 100, message: 'password length must be less than or equal to 100 characters long' }
          })} />
        {errors.password?.message && <span className='errMsg'>{errors.password.message}</span>}
      </Form.Group>

      {errMsg !== null ? <p className='errMsg'>{errMsg}</p>
        : <></>}
      {loading ?
        <div className='spinner'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner></div>
        : <></>}

      <Button variant="outline-dark" type="submit"  className='regBtn'> Submit </Button>
    </Form>
  );
}

export default Register;