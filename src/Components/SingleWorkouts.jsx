import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Introduction from './Workout_Introduction'
import RazorPay from './RazorPay';

const url = 'https://qurrit-react.herokuapp.com/api/programs/'


function SingleWorkouts({ loggedInStatus, user, setTempProgramId }) {
    const history = useNavigate();
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [singleWorkout, setSingleWorkout] = useState([])

    const [value, setValue] = useState(0)
    const [userName, setUserName] = useState('')
    const [workouts, setWorkouts] = useState()
    const [workout, setWorkout] = useState()
    const [bought, setBought] = useState(false)


    const filterWorkout = () => {
        if (workouts) {

            const tempWorkout = [workouts.filter((workout) => parseInt(workout.id, 10) === parseInt(id, 10))]
            setWorkout(tempWorkout)


        }
    }


    var j = -1;
    var i = -1;


    const fetchWorkouts = async () => {

        try {
            const response = await fetch(`https://qurrit-react.herokuapp.com/api/programs`)
            const data = await response.json()


            if (data) {
                const newWorkouts = data.map((items) => {

                    const { id, program_name, trainer_name, duration, cost, image } = items;
                    return { id, program_name, trainer_name, duration, cost, image }
                })

                setWorkouts(newWorkouts)
                fetchSingleWorkout()
            }

        } catch (error) {
            console.log(error)

        }
    }

    const fetchSingleWorkout = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${url}${id}`);
            const newWorkouts = await response.json([]);
            setSingleWorkout(newWorkouts)

            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    };

    useEffect(() => {

        fetchWorkouts()

    }, [])

    useEffect(() => {
        filterWorkout()

    }, [singleWorkout && workouts])

    useEffect(() => {
        fetchUserName()


    }, [workout])


    useEffect(() => {
        if (user.loginData && workout) {
            checkBought()
        }

    }, [workout && user])



    const fetchUserName = async () => {

        try {
            const response = await fetch("https://qurrit-react.herokuapp.com/accounts/getusername", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "program_id": workout[0][0].id }),
            });

            const userValue = response.json()

            userValue.then((msg) => {
                setUserName(msg)

            })


        } catch (error) {
            console.log(error);
        }
    };

    const checkBought = () => {
        if (user.loginData) {
            if (user.loginData.programs.includes(workout[0][0].id)) {
                setBought(true)

            }
        }
    }



    const handleClick = (item) => {
        setValue(singleWorkout[0].indexOf(item))
    }





    if (loading) {
        return (<div>loading</div>)
    };

    return (
        <React.Fragment>
            <Introduction />
            {workout[0][0] ?
                <section>
                    <div className='trainerGrid'>
                        <div>
                            <h2 className='title-underline-text'>About Trainer</h2>

                        </div>
                        <div className='trainerInfoGrid'>
                            <div className='trainerPictureBox'>
                                <div className="trainerpage-image cover">
                                    <img src={(workout[0][0].image)} />
                                </div>
                                <div className='single-workout-cost-view'>
                                    <div className='single-workout-cost'>
                                        {bought ? null : <div>
                                            <div className='center fontsize-20'>Cost:{workout[0][0].cost} INR</div>
                                            {loggedInStatus === 'LOGGED_IN' ? <RazorPay id={user.loginData.user_id} program_id={workout[0][0].id} /> :
                                                <div>Need to Login to purchase Workout Program</div>}</div>}
                                        <div className='default-button background-brandBlack  center'> <Link className='text-color-white ' to={`/viewprofile/${userName}`} >View Trainer Profile</Link></div>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <div className=' trainer-infobox'>

                                    <div className='exercise-info ' >
                                        <div className='trainer-infobox-text'>
                                            <div >Trainer Name: </div>

                                            <div >
                                                {workout[0][0].trainer_name}
                                            </div>
                                        </div>
                                        <div className='trainer-infobox-text'>
                                            <div>Program Name: </div>
                                            <div>
                                                {workout[0][0].program_name}
                                            </div>
                                        </div>
                                        <div className='trainer-infobox-text'>
                                            <div>Duration Of Workout: </div>
                                            <div>
                                                {workout[0][0].duration} Months
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='trainerInfoText'>
                                    <h1 className='trainer-infobox-text-title'>Synopsis</h1>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    </p>
                                </div>
                                <div className='trainerInfoText'>
                                    <h1 className='trainer-infobox-text-title'>Information About Workout</h1>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the
                                        1500s, when an unknown printer took a galley of type and scrambled it to make a type</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='workout-plan-header'>Workout Plan</div>
                    <div className='workout-program background-grey'>

                        <div className='days-layout'>
                            {singleWorkout[0].map((item) => {
                                i = i + 1;
                                return (

                                    <button className={`days ${i === value && 'activeBtn'}`} key={item.id} onClick={() => handleClick(item)}>{`Day ${i + 1}`}</button>
                                )
                            })}
                        </div>

                        <div className='exercise-layout'>
                            {singleWorkout[0][value].sets.map((item1) => {

                                j = j + 1;
                                return (
                                    <section key={j}>

                                        <div className={`exercise-infobox ${value > 0 && !bought && 'blur'}`}>
                                            <div className='excercise-number'>{j + 1}</div>
                                            <div>
                                                <div className='exerciselayout'>
                                                    <div className='exercisename'>exercise name</div>
                                                    <div className='exercise1-info'>
                                                        <div className='trainer1-infobox-text'>
                                                            <div>reps</div>
                                                            <div>{singleWorkout[0][value].reps[j]}</div>
                                                        </div>

                                                        <div className='vertical'></div>
                                                        <div className='trainer1-infobox-text'>
                                                            <div>sets</div>
                                                            <div>{item1}</div>
                                                        </div>
                                                        <div className='vertical'></div>
                                                        <div className='trainer1-infobox-text'>
                                                            <div>rest</div>
                                                            <div>{singleWorkout[0][value].rest[j]}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )
                            }
                            )}
                        </div>
                    </div>

                </section>
                : null}
        </React.Fragment >
    );

};

export default SingleWorkouts;



