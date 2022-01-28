import React, { useState } from "react";
import ExerciseDropdown from "./ExerciseDropdown";

const Exercise = ({
    passExercise_id,
    passSets,
    passReps,
    passRest,
    passName,
}) => {
    const [exercise_id, setExercise_id] = useState([]);
    const [name, setName] = useState([]);
    const [reps, setReps] = useState([]);
    const [sets, setSets] = useState([]);
    const [rest, setRest] = useState([]);

    const handleExercise_id = (id) => {
        setExercise_id(id.value);
        setName(id.label);
    };

    const handleReps = (event) => {
        setReps(event.target.value);
    };

    const handleSets = (event) => {
        setSets(event.target.value);
    };

    const handleRests = (event) => {
        setRest(event.target.value);
    };

    const updateWorkout = () => {
        passExercise_id(exercise_id);
        passName(name);
        passSets(sets);
        passReps(reps);
        passRest(rest);
    };

    return (
        <div >
            <div className='ex-infos'>
                <div>
                    <div >
                        Exercise
                    </div>
                    <ExerciseDropdown setid={handleExercise_id} />
                </div>
            </div>
            <div className='ex-infos'>
                <div className='ex-info'>
                    <div>
                        Sets
                    </div>

                    <input

                        required="required"
                        type="number" onChange={handleSets} />
                </div>
                <div className='ex-info'>
                    <div>
                        Reps
                    </div>
                    <input type="number" onChange={handleReps} />
                </div>
                <div className='ex-info'>
                    <div>
                        Rest
                    </div>
                    <input type="number" onChange={handleRests} />
                </div>
            </div>
            <div>
                <button className='exercise-add-button' onClick={updateWorkout}>Add Exercise</button>
            </div>
        </div>
    );
};

export default Exercise;