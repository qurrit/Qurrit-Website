import React, { Component, useEffect, useState } from 'react';
import Upload_Image from './Upload_Image';

const UserSettings = ({ loggedInStatus, user }) => {

    console.log(user)

    const [values, setValues] = useState({
        id: '',
        current_password: '',
        new_password: ''
    });

    const [error, setError] = useState('')
    const [showEditPassword, setShowEditPassword] = useState(false)
    const [showEditImage, setShowEditImage] = useState(false)

    const postPassword = async () => {

        try {
            const response = await fetch("https://qurrit-react.herokuapp.com/accounts/resetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user.loginData.user_id,
                    current_password: values.current_password,
                    new_password: values.new_password
                }),
            });

            const tempProfile = response.json()

            tempProfile.then((msg) => {
                console.log(msg)
            })


        } catch (error) {
            console.log(error);
        }
    };

    const postImage = async (imgURL) => {

        try {
            const response = await fetch("https://qurrit-react.herokuapp.com/accounts/updateimage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user.loginData.user_id,
                    url: imgURL
                }),
            });

            const tempProfile = response.json()

            tempProfile.then((msg) => {
                console.log(msg)
            })


        } catch (error) {
            console.log(error);
        }
    };



    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        });

    };

    const handleEdit = e => {
        e.preventDefault()
        if (values.current_password && values.new_password.length > 6) {
            postPassword()
            console.log(({
                id: user.loginData.id,
                current_password: values.current_password,
                new_password: values.new_password
            }))
            setError('')
        }
        else {
            setError('password has to more than 6 characters')
        }

    }


    const submitImageUrl = (imgUrl) => {
        postImage(imgUrl)
        console.log(JSON.stringify({
            id: user.loginData.id,
            url: imgUrl
        }))
    }

    const handlePasswordChange = () => {
        setShowEditPassword(!showEditPassword)
    }

    const handleImageChange = () => {
        setShowEditImage(!showEditImage)
    }


    return (
        <section className='center background-brandLightBlue pageHeight'>
            <div className='userSettings-text'>User Settings</div>
            {showEditPassword ?
                <form onSubmit={handleEdit}>
                    <div>
                        <label>
                            Current Password
                        </label>
                        <input
                            id='current_password'
                            type='text'
                            name='current_password'
                            placeholder='Enter current password'
                            value={values.current_password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            New Password
                        </label>
                        <input
                            id='new_password'
                            type='text'
                            name='new_password'
                            placeholder='New password'
                            value={values.new_password}
                            onChange={handleChange}
                        />
                    </div>
                    {error ? <div>{error}</div> : null}
                    <button className='default-button background-brandBlack text-color-white' type='submit'>Submit Editted Password</button>
                </form> : null}
            <div>
                {!showEditPassword ?
                    <button className='default-button background-brandBlack text-color-white' onClick={handlePasswordChange}>Edit Password</button>
                    : <button className='default-button background-brandBlack text-color-white' onClick={handlePasswordChange}>Password Edit Done</button>}
            </div>
            <div>
                {!showEditImage ?
                    <button className='default-button background-brandBlack text-color-white' onClick={handleImageChange}>Upload Image</button>
                    :
                    <React.Fragment>
                        <Upload_Image submitImageUrl={submitImageUrl} />
                        <button className='default-button background-brandBlack text-color-white' onClick={handleImageChange}>Done</button>
                    </React.Fragment>
                }
            </div>
        </section>)
}
export default UserSettings;