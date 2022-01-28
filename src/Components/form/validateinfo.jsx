import React, { Component, useEffect, useState } from 'react';

export default function ValidateInfo(values, userData) {
    let errors = {}


    if (!values.first_name.trim()) {
        errors.first_name = "First Name Required"
    }

    if (!values.last_name.trim()) {
        errors.last_name = "Last Name Required"
    }

    if (!values.username.trim()) {
        errors.username = "Username Required"
    } else if (userData) {
        userData.map((singleData) => {
            if (singleData.username === values.username) {
                errors.username = "Username Taken"
            }
        }
        )
    }

    if (!values.email) {
        errors.email = 'Email Required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email Address is invalid'
    } else if (userData) {
        userData.map((singleData) => {
            if (singleData.email === values.email) {
                errors.email = "Email Taken"
            }
        }
        )
    }

    if (!values.password) {
        errors.password = 'Password Required'
    } else if (values.password.length < 8) {
        errors.password = 'Password needs to be more than 8 characters'
    }

    if (!values.password2) {
        errors.password2 = 'Password Required'
    } else if (values.password !== values.password2) {
        errors.password2 = 'Passwords do no match'
    }

    if (!values.user_type) {
        errors.user_type = 'Need to choose one'
    }


    return errors;
}