import React, { useState } from "react";

import Exercise from "./Exercise";
import ExerciseList from "./ExerciseList";

const ExerciseWorkout = ({ createProgram, showWorkout_button }) => {
    const [showSubmitWorkout_button, setShowSubmitWorkout_button] =
        useState(true);

    const [name, setName] = useState("");
    const [exercise_id, setExercise_id] = useState([]);
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState([]);
    const [reps, setReps] = useState([]);
    const [rest, setRest] = useState([]);

    let updateExercise_id = (newId) => {
        setExercise_id((exercise_id) => [...exercise_id, newId]);
    };

    let updateSets = (newSet) => {
        setSets((sets) => [...sets, newSet]);
    };

    let updateReps = (newRep) => {
        setReps((reps) => [...reps, newRep]);
    };

    let updateRest = (newRest) => {
        setRest((rest) => [...rest, newRest]);
    };

    const updateExerciseName = (newName) => {
        setExerciseName((exerciseName) => [...exerciseName, newName]);
    };

    const handleSetProgram = () => {
        setShowSubmitWorkout_button(false);
        showWorkout_button(false);

        createProgram({
            name: name,
            exercise_id: exercise_id,
            sets: sets,
            reps: reps,
            rest: rest,
        });
    };

    return (
        <div>
            <div className='ex'>
                <div>
                    Name
                </div>
                <input type="text" onChange={(event) => setName(event.target.value)} />
                <div>
                    <div>
                        <ExerciseList names={exerciseName} />
                    </div>

                    {showSubmitWorkout_button ? (
                        <Exercise
                            passExercise_id={updateExercise_id}
                            passSets={updateSets}
                            passReps={updateReps}
                            passRest={updateRest}
                            passName={updateExerciseName}
                        />
                    ) : null}
                </div>
            </div>
            <div className='submit-workout-button-backgroundcolor'>
                <button className='submit-workout-button' onClick={handleSetProgram}>Submit Workout</button>
            </div>
        </div>
    );
};

export default ExerciseWorkout;