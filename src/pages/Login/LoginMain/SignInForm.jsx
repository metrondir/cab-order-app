import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import log from '../../../images/info.svg';
import register from '../../../images/register.svg';
import SignIn from './SignIn';
import './SignInForm.css';
import SignUp from './SignUp';

const SignInForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    const handleResponse = (res) => {
    }

    return (
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
        <Link to="/home">
            <span className="pageCloseBtn"><FaTimes /></span>
        </Link>
        <div className="forms-container">
            <div className="signIn-singUp">
                <SignIn handleResponse={handleResponse} />
                <SignUp handleResponse={handleResponse} />
            </div>
        </div>
    
        <div className="panels-container">
            <div className="panel left-panel">
                <div className="content">
                    <h3>New here?</h3>
                    <p>Welcome to an exciting world of possibilities! Join our vibrant community and unlock a world of opportunities. Whether you're a creative innovator, a tech enthusiast, or someone looking to connect and explore, we've got something for you.</p>
                    <button className="iBtn transparent" onClick={() => setSignUp(true)}>Sign Up</button>
                </div>
                <img src={`${log}`} alt="" className="pImg" />
            </div>
    
            <div className="panel right-panel">
                <div className ="content">
                    <h3>One of us?</h3>
                    <p>Welcome back! It's great to have you with us. Don't miss out on all the exciting things happening within our community. Sign in and continue your journey with us.</p>
                    <button className="iBtn transparent" onClick={() => setSignUp(false)}>Sign In</button>
                </div>
                <img src={`${register}`} alt="" className="pImg" />
            </div>
        </div>
    </div>

    );
};

export default SignInForm;