import React, { Component, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";


import Cookies from 'universal-cookie';



const LoginPage = ({ handleCookie }) => {

    const history = useNavigate();
    const cookies = new Cookies();
    const [loginSuccess, setLoginSuccess] = useState(true)

    const [values, setValues] = useState({
        username: '',
        password: ''

    });

    const [loginData, setLoginData] = useState()

    const handleSubmit = e => {
        e.preventDefault();
        sendData();

    }

    useEffect(() => {
        if (loginData) {
            handleSuccess();
        }
    }, [loginData])

    const handleSuccess = () => {
        console.log(loginData)
        if (loginData && !(loginData === 'error')) {
            handleCookie({
                loggedInStatus: "LOGGED_IN",
                user: {
                    loginData: {
                        id: loginData.id,
                        username: loginData.username,
                        user_type: loginData.user_type,
                        programs: loginData.programs,
                        user_id: loginData.user_id,
                        profile_image: loginData.image
                    }
                }
            })

            cookies.set('userName', loginData.username)
            cookies.set('user_id', loginData.user_id)
            cookies.set('trainer_id', loginData.id)

            history("/profile");
        }
    }


    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    let sendData = async () => {
        const response = await fetch("https://qurrit-react.herokuapp.com/accounts/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const userValue = response.json()
        userValue.then((msg) => {
            setLoginData(msg)

            if (msg === 'error') {
                setLoginSuccess(false)
                console.log(false)
            }
            else {
                setLoginSuccess(true)
                console.log(msg)
            }

        })
    };


    return (
        <section className=' form-backgroundcolor'>
            <div className='center-form'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit} className='form' noValidate>
                        <h1>Fill Out Form</h1>

                        <div className='form-inputs'>
                            <label className='form-label'>
                                Username
                            </label>
                            <input
                                className='form-input'
                                id='username'
                                type='text'
                                name='username'
                                placeholder='Enter Username'
                                value={values.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-inputs'>
                            <label className='form-label'>
                                Password
                            </label>
                            <input
                                className='form-input'
                                id='password'
                                type='text'
                                name='password'
                                placeholder='Enter Password'
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='form-input-btn' type='submit'>Login</button>
                    </form>
                    <div >
                        {!loginSuccess ? <p className='text-color-red center'>incorrect combination, try again</p> : null}</div>
                    <p className='forgot-password' ><Link className='forgot-password text-color-white' to='/forgot'>Forgot Password?</Link></p>
                </div>
            </div>
        </section>
    )

}

export default LoginPage;