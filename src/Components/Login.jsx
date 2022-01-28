import React, { useState, Component } from 'react';

function Login() {

    const [userNames, SetUserNames] = useState(['123', '23'])
    const [passWords, SetPassWords] = useState(['hello', 'hi'])
    const [newUser, SetNewUser] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newUser) {
            console.log('no name')
        } else if (userNames.some(name => name === newUser)) {
            console.log('username taken')
        } else {
            SetUserNames([...userNames, newUser])
            console.log(userNames)
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='UserName'>
                        User Name
                    </label>
                    <input type='text' id='UserName' onChange={(e) => SetNewUser(e.target.value)} />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <div>{console.log(newUser)}</div>
        </section>
    )

}

export default Login;