import React, { useState } from 'react';
import { FaAddressBook, FaCheck, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import swal from 'sweetalert';
import axios from 'axios';


// password regex
// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)


const SignUp = ({ handleResponse }) => {
	const navigate = useNavigate();
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    const [passwordValidation, setPasswordValidation] = useState({
        carLength: false,
        specailChar: false,
        upperLowerCase: false,
        numeric: false
    })
    const [emailError, setEmailError] = useState({
        emailError: false
    })

    const handleEmailError = (name, value) => {
        if (name === 'email') {
            setEmailError({
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            })
        }
    }
    const hanldeValidation = (name, value) => {
        if (name === 'password') {
            setPasswordValidation({
                carLength: (value.length > 8),
                specailChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
                upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
                numeric: /^(?=.*\d)/.test(value),
            })
        }
    }

    const hanldeOnChange = (e) => {
        let { name, value } = e.target;
        hanldeValidation(name, value)
        handleEmailError(name, value)
        let isPassValid = true;
        if (name === 'user_type') {
            // Capture user_type value
            isPassValid = value !== "";
        }
        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value);
        }
        if (value === 'password') {
            isPassValid = ((value.length > 8)
                && /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
                && /^(?=.*[a-z])(?=.*[A-Z])/.test(value)
                && /^(?=.*\d)/.test(value))
        }
        if (isPassValid) {
            const newPass = { ...user };
            newPass[name] = value
            setUser(newPass)
        }
    }
    const hanldeOnSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        
        const registerInfo = {
            name : user.displayName,
            email: user.email,
            password: user.password,
            user_type: user.user_type,
        }
        try{
            // Register With node-server & mongodb
            const data = await axios.post(process.env.REACT_APP_GOOGLE_API_KEY+'/user/register', registerInfo)
            setLoading(false);
            swal({
                icon:'success',
                text:'Successfully Sign Up',
                timer: 2000
            }); setTimeout(() => {
					navigate('/home');
				 }, 2000); // Redirect to the home page
		  
        }
        catch(err){
            setLoading(false);
            setError(err);
        }
    }

    return (
        <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
                <span className="fIcon"><FaUser /></span>
                <input placeholder="Enter Your Full Name" name="displayName" type="text" onChange={(e) => hanldeOnChange(e)} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input placeholder="Enter Your Email" name="email" type="email" autoComplete="username" onChange={(e) => hanldeOnChange(e)} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaLock /></span>
                <input type="password" name="password" placeholder="Create Password"  autoComplete="current-password" onChange={(e) => hanldeOnChange(e)} />
            </div>
            <div className="input-field">
    <span className="fIcon"><FaAddressBook /></span>
    <select
        required
        name="user_type"
        className="dropdown"
        onChange={(e) => hanldeOnChange(e)}
        defaultValue={'Choose who you want to be'}
    >
       <option value={null} disabled hidden>Choose who you want to be</option>
        <option value="customer">Customer</option>
        <option value="driver">Driver</option>
    </select>
</div>



            {error.length && <h6 className="text-danger text-center">{error}</h6>}
            <button type="submit"
                className="btn btn-primary btn-block mt-2 iBtn"
                disabled={
                    passwordValidation.carLength && passwordValidation.numeric && passwordValidation.upperLowerCase && passwordValidation.specailChar && emailError.emailError ? "" : true
                }
            >
                {loading ? <Spinner animation="border" variant="info" /> : "Sign Up"}
            </button>

            <div className="password-validatity mx-auto">

                <div style={emailError.emailError ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Must Have Valid Email.</p>
                </div>

                <div style={passwordValidation.carLength ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have atlast 8 character.</p>
                </div>

                <div style={passwordValidation.specailChar ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have a special cracter.</p>
                </div>

                <div style={passwordValidation.upperLowerCase ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have uppercase and lower case.</p>
                </div>

                <div style={passwordValidation.numeric ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have Number.</p>
                </div>
            </div>

          
        </form>

    );
};

export default SignUp;