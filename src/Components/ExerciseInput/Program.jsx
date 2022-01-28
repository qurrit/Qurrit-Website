import React, { useEffect, useState } from "react";
import ExerciseWorkout from "./ExerciseWorkout";
import WorkoutList from "./WorkoutList";

import Cookies from 'universal-cookie';

const Program = () => {
    const [data, setData] = useState([
        {
            program_name: "",
            trainer_name: "",
            duration: "",
            cost: "",
        },
    ]);

    const cookies = new Cookies();
    const trainer_id_temp = cookies.get('id')

    const [showWorkout_button, setShowWorkout_button] = useState(false);

    const [program_name, setProgram_name] = useState("");
    const [trainer_name, setTrainer_name] = useState("");
    const [duration, setDuration] = useState(0);
    const [cost, setCost] = useState(0);



    const createProgram = (program_data) => {
        setData((data) => [
            ...data,
            {

                name: program_data["name"],
                exercise_id: program_data["exercise_id"],
                sets: program_data["sets"],
                reps: program_data["reps"],
                rest: program_data["rest"],
            },
        ]);
    };

    useEffect(() => {
        setData([
            {
                program_name: program_name,
                trainer_name: trainer_name,
                duration: duration,
                cost: cost,
                trainer_id: trainer_id_temp,
            },
        ]);
    }, [program_name, trainer_name, duration]);

    let sendData = async () => {

        console.log(JSON.stringify(data))
        await fetch("https://qurrit-react.herokuapp.com/api/programs/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    };

    return (
        <div className='programs'>
            <div className='program-title'> Create Workout</div>
            <div className='program-infos'>
                <div className='program-info'>
                    <div>
                        Program Name
                    </div>
                    <input
                        required="required"
                        type="text"
                        onChange={(event) => setProgram_name(event.target.value)}
                    />
                </div>
                <div className='program-info'>
                    <div>
                        Trainer Name
                    </div>
                    <input
                        required="required"
                        type="text"
                        onChange={(event) => setTrainer_name(event.target.value)}
                    />
                </div>
                <div className='program-info'>
                    <div>
                        Duration
                    </div>
                    <input
                        type="number"
                        onChange={(event) => setDuration(event.target.value)}
                    />
                </div>
                <div className='program-info'>
                    <div>
                        Cost
                    </div>
                    <input
                        type="number"
                        onChange={(event) => setCost(event.target.value)}
                    />
                </div>
            </div>

            {showWorkout_button ? (
                <ExerciseWorkout
                    createProgram={createProgram}
                    showWorkout_button={setShowWorkout_button}
                />
            ) : (
                <button className='add-workout-button' onClick={() => setShowWorkout_button(true)}>
                    Add New Workout
                </button>
            )}
            <div className='submitted-program'>
                <div className='submitted-program-title'>Your Submitted Workout</div>
                <div className='submit-program-button-position'>
                    <button className='submit-program-button' onClick={sendData}>Submit Program</button>
                </div>
                <div>
                    {data[1] ? (
                        <div>
                            <WorkoutList workout={data.slice(1)} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Program;