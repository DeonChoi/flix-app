import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [invalidFirst, setInvalidFirst] = useState(false);
    const [firstError, setFirstError] = useState('');
    const [invalidLast, setInvalidLast] = useState(false);
    const [lastError, setLastError] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [registeredError, setRegisteredError] = useState('');

    const validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    };

    const onChangeFirstName = e => {
        setFirstName(e.target.value);
        setInvalidFirst(true);
        setFirstError('Enter a first name at least two characters long');
        if (e.target.value.length>=2) {
             setInvalidFirst(false);
             setFirstError('');
        };
    };

    const onChangeLastName = e => {
        setLastName(e.target.value);
        setInvalidLast(true);
        setLastError('Enter a last name at least two characters long');
        if (e.target.value.length>=2) {
             setInvalidLast(false);
             setLastError('');
        };
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
        setPasswordError('Enter a password between 6 and 32 characters');
        if (e.target.value.length>=6 && e.target.value.length<=32) {
             setInvalidPassword(false);
             setPasswordError('');
        };
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const userRegister = {
            firstName,
            lastName,
            email,
            password
        };
        await axios.post('/user/register', userRegister)
                .then( res => {
                    // console.log(res); 
                    if (res.data === 'User added...'){
                        props.history.push('./login')
                    } else {
                        setRegisteredError(res.data);
                    };
                })
                .catch( err => console.error(err));
    };

    return (
        <div>
            
            <form className='registerForm' onSubmit={onSubmit} action = '/user/register' method = 'POST'>
                <p className='text-center' className='errorMessage'>{registeredError}</p>
                <h1 className='text-white text-center'>Register</h1>
                <div className=''>
                    <input type='text' className={`registerInput text-center ${invalidFirst ? 'invalid' : '' }`} placeholder='First Name' onChange={onChangeFirstName} required/>
                </div>
                <div style={{color: 'red', fontSize: '0.85rem'}}>{firstError}</div>
                <div className=''>
                    <input type='text' className={`registerInput text-center ${invalidLast ? 'invalid' : '' }`} placeholder='Last Name' onChange={onChangeLastName} required/>
                </div>
                <div style={{color: 'red', fontSize: '0.85rem'}}>{lastError}</div>
                <div className=''>
                    <input type='email' className={`registerInput text-center ${invalidEmail ? 'invalid' : '' }`} placeholder='Email Address' onChange={onChangeEmail} required/>
                </div>
                <div style={{color: 'red', fontSize: '0.85rem'}}>{emailError}</div>
                <div className=''>
                    <input type='password' className={`registerInput text-center ${invalidPassword ? 'invalid' : '' }`} placeholder='Password' onChange={onChangePassword} required/>
                </div>
                <div style={{color: 'red', fontSize: '0.85rem'}}>{passwordError}</div>
                <div className=''>
                    <button type="submit" className='registerSubmit'>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;