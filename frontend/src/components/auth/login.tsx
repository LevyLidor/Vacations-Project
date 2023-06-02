import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CredentialsModel from '../../models/credentials-model';
import { login } from '../../Redux/slice/userSlice';
import authServices from '../../services/authServices';
import config from '../../utils/config';
import "./form.css";



function Login() {

  const [loading, setLoading] = useState(false)
  const [errMsg, setEerrMsg] = useState(null)
  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const { getValues, register, handleSubmit, formState: { errors }, reset } = useForm<CredentialsModel>()
  const nav = useNavigate();

  const [valToken, setValToken] = useState();
  const dispatch = useDispatch();


  function sub({ email, password }: CredentialsModel) {
    setLoading(true)

    try {
      authServices.login(email, password)
        .then((token) => {
          if (token) {
            setValToken(token)
            localStorage.setItem(config.TOKEN_KEY, token);

            setEerrMsg(null);

            nav('/vacations')
            setLoading(false)
          }

        }).catch((error: any) => {
          if (error) setLoading(false);
          setEerrMsg(error.response.data)
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

    <Form className='form-login' onSubmit={handleSubmit(sub)}>
      <h1 className='loginTitle'>Login</h1>

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
            minLength: { value: 4, message: 'Password length must be at least 4 characters long' },
            maxLength: { value: 100, message: 'Password length must be less than or equal to 100 characters long' }
          })} />
        {errors.password?.message && <span className='errMsg'>{errors.password.message}</span>}
      </Form.Group>

      {errMsg !== null ? <p className='errMsg'>{errMsg}</p>
        : <p> </p>}
      {loading ?
        <div className='spinner'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner></div>
        : <p></p>}

      <Button variant="outline-dark" type="submit">
        Submit
      </Button>

    </Form>



  );
}

export default Login;