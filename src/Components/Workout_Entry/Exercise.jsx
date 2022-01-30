import React, { useEffect, useState } from "react";
import ExerciseDropdown from "./ExerciseDropdown";

const Exercise = ({ handleExercise }) => {
    const [exerciseId, setExerciseId] = useState();
    const [exerciseName, setExerciseName] = useState("");
    const [set, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [rest, setRest] = useState(0);

    const [exercise, setExercise] = useState({});

    useEffect(() => {
        setExercise({
            exerciseId: exerciseId,
            exerciseName: exerciseName,
            sets: set,
            reps: reps,
            rest: rest,
        });
    }, [exerciseId, exerciseName, set, reps, rest]);

    const onclick = () => {
        if (exerciseId === undefined) {
            alert("Select Exercise");
        } else {
            handleExercise(exercise);
        }
    };

    const handleExerciseId = (id) => {
        setExerciseId(id.value);
        setExerciseName(id.label);
    };

    return (
        <div>
            <div className='ex-infos'>
                <div >
                    <div>
                        Exercise Name:
                    </div>
                    <ExerciseDropdown setId={handleExerciseId} />
                </div>
            </div>
            <div className='ex-infos'>
                <div className='ex-info'>
                    <div >
                        Sets :
                    </div>
                    <input
                        className='program-input'
                        type="number"
                        onChange={(event) => setSets(event.target.value)}
                    />
                </div>

                <div className='ex-info'>
                    <div>
                        Reps :
                    </div>
                    <input
                        className='program-input'
                        type="number"
                        onChange={(event) => setReps(event.target.value)}
                    />
                </div>
                <div className='ex-info'>
                    <div>
                        Rest :
                    </div>
                    <input
                        className='program-input'
                        type="number"
                        onChange={(event) => setRest(event.target.value)}
                    />
                </div>
            </div>

            <div>
                <button className='exercise-add-button' onClick={onclick}>Submit Exercise</button>
            </div>
        </div>
    );
};

export default Exercise;