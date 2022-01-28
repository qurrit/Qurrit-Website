import React, { Component, useState, useEffect } from 'react';
import Workout from './Workout'
import { Link } from 'react-router-dom'

const Profile = ({ loggedInStatus, user }) => {



    const [trainerWorkouts, setTrainerWorkouts] = useState([])
    const [workout, setWorkout] = useState([])

    const filterWorkout = () => {
        const temp = [trainerWorkouts.filter((trainerWorkout) => user.loginData.programs.includes(trainerWorkout.id))]
        setWorkout(temp[0])

    }

    const fetchWorkouts = async () => {

        try {
            const response = await fetch(`https://qurrit-react.herokuapp.com/api/programs`)
            const data = await response.json()


            if (data) {
                const newWorkouts = data.map((items) => {
                    const { id, program_name, trainer_name, duration, cost, image } = items;
                    return { id, program_name, trainer_name, duration, cost, image }
                })

                setTrainerWorkouts(newWorkouts)

            }

            else {
                setTrainerWorkouts([])
            }



        } catch (error) {
            console.log(error)

        }

    }



    useEffect(() => {
        fetchWorkouts()
    }, [])

    useEffect(() => {
        if (loggedInStatus === 'LOGGED_IN' && user.loginData.programs !== undefined) {
            filterWorkout()
        } else {
            fetchWorkouts()
        }

    }, [user && trainerWorkouts])


    if (loggedInStatus === 'LOGGED_IN' && user.loginData !== undefined) {
        if (user.loginData.user_type === 'Trainer') {
            return (
                <section>
                    <div className='profile-relative'>
                        <div className='profile-userName'>{user.loginData.username}</div>
                        {user.loginData.profile_image ? <img className='profile-img' src={user.loginData.profile_image} /> :
                            <div className='profile-img '><div className='profile-img-text'>Upload Image in User Settings</div></div>}

                    </div>
                    <div className='profile-myWorkouts'>
                        <Link className='userSettings-button' to={`/usersettings`} >User Settings</Link>
                        <Link className='createWorkout-button' to={`/program1`} >Create Workout</Link>
                        <div className='profile-myworkouts-text'>My Created Workouts</div>
                    </div>
                    <div className='profile-myWorkouts'>
                        {workout.length > 0 ?
                            <div className='grid-container'>

                                {workout.map((workout) => {

                                    return <Workout key={workout.id} {...workout}></Workout>
                                })
                                }
                            </div>
                            : <div className='center'>No workouts created, Please Create a workout</div>}
                    </div>

                </section>
            )
        }
        else if (user.loginData.user_type === 'Customer') {
            return (<section>
                <div className='profile-relative'>
                    <div className='profile-userName'>{user.loginData.username}</div>
                    {user.loginData.profile_image ? <img className='profile-img' src={user.loginData.profile_image} /> :
                        <div className='profile-img '><div className='profile-img-text'>Upload Image in User Settings</div></div>}
                </div>
                <div className='profile-myWorkouts'>
                    <Link className='userSettings-button' to={`/usersettings`} >User Settings</Link>
                    <div className='profile-myworkouts-text'>My Workouts</div>
                </div>
                <div className='profile-myWorkouts'>
                    {workout.length > 0 ?
                        <div className='grid-container'>

                            {workout.map((workout) => {
                                return <Workout key={workout.id} {...workout}></Workout>
                            })
                            }
                        </div>
                        :
                        <React.Fragment><div className='center'>No Workouts Bought</div>
                            <p className='center '> <Link className='text-color-white default-button background-brandBlack' to={`/`} >View Workouts for Sale</Link></p>
                        </React.Fragment>}

                </div>


            </section>)
        }
        else {
            return (<div>Please logout and login again</div>)
        }
    }
    else {
        return (<div>Not Logged In</div>)
    }

}

export default Profile;