import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import Workout from './Workout'

const ViewProfile = () => {

    const url = 'https://qurrit-react.herokuapp.com/api/programs'

    const [profileData, setProfileData] = useState()
    const [trainerWorkouts, setTrainerWorkouts] = useState([])
    const [workout, setWorkout] = useState([])

    const { username } = useParams('')
    console.log(profileData)


    const filterWorkout = () => {
        const temp = [trainerWorkouts.filter((trainerWorkout) => profileData.programs.includes(trainerWorkout.id))]
        setWorkout(temp[0])

    }


    const fetchProfileData = async () => {

        try {
            const response = await fetch("https://qurrit-react.herokuapp.com/accounts/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": username }),
            });

            const tempProfile = response.json()

            tempProfile.then((msg) => {
                setProfileData(msg)
                console.log(msg)
            })


        } catch (error) {
            console.log(error);
        }
    };




    const fetchWorkouts = async () => {

        try {
            const response = await fetch(`${url}`)
            const data = await response.json()
            console.log(data)

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
        fetchProfileData();

    }, [])

    useEffect(() => {
        filterWorkout()

    }, [profileData && trainerWorkouts])



    if (trainerWorkouts[0] !== undefined && profileData !== undefined) {

        return (

            <section>
                <div className='profile-relative'>
                    <div className='profile-userName'>{username}</div>
                    <img className='profile-img' src={profileData.profile_image} />
                </div>
                <div className='profile-myWorkouts'>
                    <div className='profile-myworkouts-text'>Workouts Created by {profileData.first_name} {profileData.last_name}</div>
                    <div className='grid-container'>
                        {workout.map((workout) => {
                            return <Workout key={workout.id} {...workout}></Workout>
                        })
                        }
                    </div>
                </div>

                <div>Status:</div>
            </section>
        )
    } else {
        return (
            <div>loading</div>
        )
    }


}

export default ViewProfile;