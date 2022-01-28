import React, { Component, useState, useEffect } from 'react';
import useForm from './useForm'
import validate from './validateinfo'
import './Form.css'

const FormSignup = ({ submitForm }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(submitForm, validate);


    return (
        <div >
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1>Fill Out Form</h1>

                <div className='form-inputs'>
                    <label className='form-label'>
                        First Name
                    </label>
                    <input
                        className='form-input'
                        id='first_name'
                        type='text'
                        name='first_name'
                        placeholder='Enter First Name'
                        value={values.first_name}
                        onChange={handleChange}
                    />
                    {errors.first_name && <p>{errors.first_name}</p>}
                </div> <div className='form-inputs'>
                    <label className='form-label'>
                        Last Name
                    </label>
                    <input
                        className='form-input'
                        id='last_name'
                        type='text'
                        name='last_name'
                        placeholder='Enter Last Name'
                        value={values.last_name}
                        onChange={handleChange}
                    />
                    {errors.last_name && <p>{errors.last_name}</p>}
                </div>
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
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>
                        Email id
                    </label>
                    <input
                        className='form-input'
                        id='email'
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>
                        Password
                    </label>
                    <input
                        className='form-input'
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>
                        Confirm Password
                    </label>
                    <input
                        className='form-input'
                        id='password2'
                        type='password'
                        name='password2'
                        placeholder='Confirm Password'
                        value={values.password2}
                        onChange={handleChange}
                    />
                    {errors.password2 && <p>{errors.password2}</p>}

                </div>
                <label className='form-label' for="user_type">What are you here for</label>
                <select id="user-type"
                    name="user_type"
                    size="2"
                    onChange={handleChange}>
                    <option value="Customer">Looking for Workout</option>
                    <option value="Trainer">Trainer, looking to create workout</option>
                </select>
                {errors.user_type && <p>{errors.user_type}</p>}
                <button className='form-input-btn' type='submit'>Sign Up</button>

            </form>

        </div>
    );
};

export default FormSignup;
