import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [invalidPassword, setInvalidPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');

    const validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    };

    const onChangeEmail = e => {
        setEmail(e.target.value);
        setInvalidEmail(true);
        setEmailError('Enter a valid email');
        if (validateEmail(e.target.value)) {
             setInvalidEmail(false);
             setEmailError('');
        };
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
        setInvalidPassword(true);
        setPasswordError('Enter a password between 6 and 1024 characters');
        if (e.target.value.length>=6 && e.target.value.length<=32) {
             setInvalidPassword(false);
             setPasswordError('');
        };
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const userLogin = {
            email,
            password
        };
        await axios.post('http://localhost:3000/user/login', userLogin)
        .then( res => {
            // console.log(res); 
            localStorage.setItem('auth-token', res.data);
            console.log('Logged In'); 
            props.history.push('..'); 
            window.location.reload();            
        })
        .catch( err => {
            console.error(err); 
            setLoginError('Invalid Email or Password');
        });
    };

    return (
        <div>
            <form className='loginForm' onSubmit={onSubmit} >
                <p className='text-center' className='errorMessage'>{loginError}</p>
                <h1 className='text-white text-center'>Login</h1>
                <div className=''>
                    <input type='email' className={`loginInput text-center ${invalidEmail ? 'invalid' : '' }`} placeholder='Email Address' onChange={onChangeEmail} />
                </div>
                <div style={{color: 'red', fontSize: '0.75rem'}}>{emailError}</div>
                <div className=''>
                    <input type='password' className={`loginInput text-center ${invalidPassword ? 'invalid' : '' }`} placeholder='Password' onChange={onChangePassword}/>
                </div>
                <div style={{color: 'red', fontSize: '0.75rem'}}>{passwordError}</div>
                <div className=''>
                    <button type="submit" className='loginSubmit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;