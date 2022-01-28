import React, { useState, Component } from 'react';
import { useNavigate, Link } from "react-router-dom";

import FormSignup from './FormSignup'
import './Form.jsx'


const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <section className='form-backgroundcolor '>
            <div className='center-form'>
                <div className='form-container'>
                    {!isSubmitted ? (
                        <FormSignup submitForm={submitForm} />
                    ) : (<React.Fragment>
                        <p className='text-color-white center'>Successfully signed up, please Login</p>
                        <p className='center'><Link className='forgot-password default-button background-brandLightBlue ' to='/login'>Login</Link></p>
                    </React.Fragment>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Form;