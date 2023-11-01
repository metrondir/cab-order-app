import React, { useState } from 'react';
import { FaAddressBook, FaCheck, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import swal from 'sweetalert';
import axios from 'axios';

const SignUp = ({ handleResponse }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    user_type: '',
  });

  const [validation, setValidation] = useState({
    username: true,
    emailError: true,
    carLength: true,
    specialChar: true,
    upperLowerCase: true,
    numeric: true,
    userType: true,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const isUsernameValid= /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.username);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
    const isPasswordValid =
      user.password.length >= 8 &&
      /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(user.password) &&
      /^(?=.*[a-z])(?=.*[A-Z])/.test(user.password) &&
      /\d/.test(user.password);
    const isUserTypeValid = user.user_type === 'customer' || user.user_type === 'driver';

    setValidation({
      usernameError: isUsernameValid,
      emailError: isEmailValid,
      carLength: isPasswordValid,
      specialChar: isPasswordValid,
      upperLowerCase: isPasswordValid,
      numeric: isPasswordValid,
      userType: isUserTypeValid,
    });

    if (isUsernameValid && isEmailValid && isPasswordValid && isUserTypeValid) {
      setLoading(true);

      const registerInfo = {
        name: user.username,
        email: user.email,
        password: user.password,
        user_type: user.user_type,
      };

      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_SERVER_URL + '/user/register',
          registerInfo
        );
        console.log(response);

        setLoading(false);
        swal({
          icon: 'success',
          text: 'Successfully Sign Up',
          timer: 2000,
        });

        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } catch (err) {
        setLoading(false);
        swal({
          icon: 'error',
          text: 'Registration failed. Please try again.',
        });
      }
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign Up</h2>
      <div className="input-field">
        <span className="fIcon">
          <FaUser />
        </span>
        <input
          placeholder="Enter Your Full Name"
          name="username"
          type="text"
          value={user.username}
          onChange={handleOnChange}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FaEnvelope />
        </span>
        <input
          placeholder="Enter Your Email"
          name="email"
          autoComplete="username"
          value={user.email}
          onChange={handleOnChange}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FaLock />
        </span>
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          autoComplete="current-password"
          value={user.password}
          onChange={handleOnChange}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FaAddressBook />
        </span>
        <select
          name="user_type"
          className="dropdown"
          onChange={handleOnChange}
          value={user.user_type}
        >
          <option value="" disabled hidden>
            Choose who you want to be
          </option>
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
        </select>
      </div>
      {formSubmitted && (
        <div className="password-validatity mx-auto">
           {!validation.usernameError && (
            <div style={{ color: validation.usernameError ? 'green' : 'red' }}>
              <p>
                {validation.usernameError ? <FaCheck /> : <FaTimes />}
                Must Have Valid Username.
              </p>
            </div>
          )}
          {!validation.emailError && (
            <div style={{ color: validation.emailError ? 'green' : 'red' }}>
              <p>
                {validation.emailError ? <FaCheck /> : <FaTimes />}
                Must Have Valid Email.
              </p>
            </div>
          )}
          {!validation.carLength && (
            <div style={{ color: validation.carLength ? 'green' : 'red' }}>
              <p>
                {validation.carLength ? <FaCheck /> : <FaTimes />}
                Password Must Have at least 8 characters.
              </p>
            </div>
          )}
          {!validation.specialChar && (
            <div style={{ color: validation.specialChar ? 'green' : 'red' }}>
              <p>
                {validation.specialChar ? <FaCheck /> : <FaTimes />}
                Password Must Have a special character.
              </p>
            </div>
          )}
          {!validation.upperLowerCase && (
            <div style={{ color: validation.upperLowerCase ? 'green' : 'red' }}>
              <p>
                {validation.upperLowerCase ? <FaCheck /> : <FaTimes />}
                Password Must Have uppercase and lowercase characters.
              </p>
            </div>
          )}
          {!validation.numeric && (
            <div style={{ color: validation.numeric ? 'green' : 'red' }}>
              <p>
                {validation.numeric ? <FaCheck /> : <FaTimes />}
                Password Must Have a number.
              </p>
            </div>
          )}
          {!validation.userType && (
            <div style={{ color: validation.userType ? 'green' : 'red' }}>
              <p>
                {validation.userType ? <FaCheck /> : <FaTimes />}
                Please choose either Customer or Driver.
              </p>
            </div>
          )}
        </div>
      )}
      {loading ? (
        <Spinner animation="border" variant="info" />
      ) : (
        <button
          type="submit"
          className="btn btn-primary btn-block mt-2 iBtn"
          disabled={
            (
              !validation.usernameError&&
              !validation.carLength &&
              !validation.numeric &&
              !validation.upperLowerCase &&
              !validation.specialChar &&
              !validation.emailError
            )
          }
        >
          Sign Up
        </button>
      )}
    </form>
  );
};

export default SignUp;
