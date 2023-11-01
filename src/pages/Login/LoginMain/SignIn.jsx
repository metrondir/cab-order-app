import React, { useState,useContext } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const SignIn = ({ handleResponse }) => {
	const { loading, error, dispatch } = useContext(AuthContext);
	const { register, handleSubmit,  formState: { errors } } = useForm();
	const navigate = useNavigate();
	const [show, setShow] = useState(true);
	setTimeout(() => {
		 setShow(false);
	}, 5000)

	const onSubmit = async (event) => {
		 dispatch({ type: "LOGIN_START" })
		 try {
			  const res = await axios.post(process.env.REACT_APP_BASE_SERVER_URL+'/user/login', event);
			  dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
			  swal({
					icon: 'success',
					text: 'Successfully Sign In',
					timer: 2000
			  });setTimeout(() => {
				navigate('/home');
			 }, 2000);
		 } catch (err) {
			  dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
		 }
	}

	return (
		 <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
			  <h2 className="title">Sign in</h2>
			  <div className="input-field">
					<span className="fIcon"><FaEnvelope /></span>
					<input {...register("email", { required: true })} placeholder="Enter Your Email" autoComplete="username" type="email" />
			  </div>
			  {errors.email && <span className="text-warning">This field is required</span>}
			  <div className="input-field">
					<span className="fIcon"><FaLock /></span>
					<input {...register("password", { required: true })} type="password"  autoComplete="current-password" placeholder="Enter Your Password" />
			  </div>
			  {errors.password && <span className="text-warning">This field is required</span>}
			  {error && <p className="text-danger">{error.message}</p>}
			  <button className="iBtn" type="submit" value="sign In" >
					{loading ? <Spinner animation="border" variant="info" /> : "Sign In"}
			  </button>
			  
		 </form>
	);
};

export default SignIn;