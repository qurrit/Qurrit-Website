import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Workout from "./Workout";
import WorkoutList from "./WorkoutList";
import EditProgram from "./EditProgram";
import Upload_Image from '../Upload_Image'

const Program1 = ({ user }) => {
    console.log(user)
    const history = useNavigate();
    const [submitted, setSubmitted] = useState(false)
    const [programName, setProgramName] = useState("");
    const [trainerName, setTrainerName] = useState("");
    const [duration, setDuration] = useState(0);
    const [cost, setCost] = useState(0);
    const [workoutList, setWorkoutList] = useState([]);

    const [showWorkout, setShowWorkout] = useState(false);

    const [showEditProgram, setShowEditProgram] = useState(false);

    const [programData, setProgramData] = useState({});

    const [trainerId, setTrainerId] = useState('')

    const [imageURL, setImageURL] = useState('')

    const handleProfile = () => {
        history("/profile")
        window.location.reload();
    }

    // get trainer id from cookie
    useEffect(() => {
        if (user.loginData) {
            setTrainerId(user.loginData.id)
        }
        setProgramData({
            programName: programName,
            trainerName: trainerName,
            duration: duration,
            cost: cost,
            workoutList: workoutList,
            trainerId: trainerId,
            imageURL: imageURL
        });
    }, [programName, trainerName, duration, cost, workoutList, trainerId]);

    const handleSubmitProgram = async () => {
        if (workoutList.length === 0) {
            alert("Workout Empty");
        } else if (programName === "") {
            alert("Enter Program Name");
        } else if (trainerName === "") {
            alert("Enter Trainer Name ");
        } else if (!duration || duration === 0) {
            alert("Enter Duration");
        } else if (cost === 0 || !cost) {
            alert("Enter Cost");
        } else {
            await fetch("https://qurrit-react.herokuapp.com/api/programs/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(programData),
            })
                .then((res) => {
                    if (res.status === 200) {
                        setSubmitted(true)

                    } else {
                        alert('something went wrong, please try again')
                    }
                })

                .catch((errs) => {
                    console.log(errs)
                })

        }
    };

    const handleWorkoutList = (workoutdata) => {
        setWorkoutList((workoutList) => [...workoutList, workoutdata]);
    };

    return (
        <secton>
            {submitted ? <section className=' form-backgroundcolor'>
                <div className='center-form'>
                    <div className='form-container'>
                        <div className='text-color-white center'>
                            <div>Successfully submitted workout</div>
                            <button className='default-button background-brandBlue text-color-black' onClick={handleProfile}>go to profile</button></div>
                    </div>
                </div>
            </section> :
                <div className='programs'>
                    <div className='program-title'> Create Workout</div>
                    <div className='program-infos'>
                        <div className='program-info'>
                            <div>
                                Program Name
                            </div>
                            <input
                                type="text"
                                onChange={(event) => setProgramName(event.target.value)}
                                placeholder="Program Name"
                            />
                        </div>
                        <div className='program-info'>
                            <div>
                                Trainer Name
                            </div>
                            <input
                                type="text"
                                onChange={(event) => setTrainerName(event.target.value)}
                                placeholder="Trainer Name"
                            />
                        </div>
                        <div className='program-info'>
                            <div>
                                Duration
                            </div>
                            <input
                                type="number"
                                onChange={(event) => setDuration(event.target.value)}
                                placeholder="Duration"
                            />
                        </div>
                        <div className='program-info'>
                            <div>
                                Cost
                            </div>
                            <input
                                type="number"
                                onChange={(event) => setCost(event.target.value)}
                                placeholder="In INR"
                            />
                        </div>
                        <div className='program-info'>
                            <div>
                                Upload Image for Workout
                            </div>
                            <Upload_Image submitImageUrl={setImageURL} />
                        </div>
                    </div>


                    {showWorkout ? (
                        <div>
                            <Workout
                                submitWorkout={handleWorkoutList}
                                handleShowWorkout={setShowWorkout}
                            />
                        </div>
                    ) : (
                        <div>
                            <button className='add-workout-button margin-left-20px' onClick={() => setShowWorkout(true)}> Add Workout </button>
                        </div>
                    )}


                    <div className='submitted-program'>
                        <div className='submitted-program-title margin-bottom-20px'>Your Submitted Workout</div>
                        <div className='submit-program-button-position'>
                            <button className='submit-program-button' onClick={handleSubmitProgram}>Submit Program</button>
                        </div>
                        <div>
                            {showEditProgram ? null : (
                                <button className='add-workout-button margin-left-20px' onClick={() => setShowEditProgram(true)}>Edit Program</button>
                            )}
                        </div>
                        <div>
                            {showEditProgram ? null : <WorkoutList workoutTable={workoutList} />}
                        </div>


                        <div>
                            {showEditProgram ? (
                                <EditProgram
                                    showEditProgram={setShowEditProgram}
                                    workoutData={workoutList}
                                    setWorkoutList={setWorkoutList}

                                />
                            ) : null}
                        </div>
                    </div>
                </div>}
        </secton>
    );
};

export default Program1;