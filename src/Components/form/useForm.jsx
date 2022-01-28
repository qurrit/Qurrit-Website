import React, { useState, useEffect, Component } from 'react';

const useForm = (callback, validate) => {

    const [userData, setUserData] = useState()


    const fetchUserData = async () => {
        try {
            const response = await fetch('/accounts/isexist')
            const userInfo = await response.json()
            setUserData(userInfo)

        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        fetchUserData()

    }, [])

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        user_type: '',
    });


    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    let sendData = async () => {
        const postValues = ({
            first_name: values.first_name,
            last_name: values.last_name,
            username: values.username,
            email: values.email,
            password: values.password,
            user_type: values.user_type,
            imageURL: ''
        })

        console.log(JSON.stringify(postValues))
        await fetch("https://qurrit-react.herokuapp.com/accounts/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postValues),
        });
    };



    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values, userData));
        setIsSubmitting(true);

    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback()
            sendData()
        }
    }, [errors])

    return { handleChange, values, handleSubmit, errors };
};

export default useForm;