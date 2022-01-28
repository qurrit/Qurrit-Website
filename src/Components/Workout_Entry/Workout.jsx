import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";
import ExerciseList from "./ExerciseList";

const Workout = ({ submitWorkout, handleShowWorkout }) => {
    const [workoutName, setWorkoutName] = useState("");
    const [exerciseList, setExerciseList] = useState([]);
    const [workoutData, setWorkoutData] = useState({});

    const handleExercise = (exercise) => {
        setExerciseList((exerciseList) => [...exerciseList, exercise]);
    };

    useEffect(() => {
        setWorkoutData({
            workoutName: workoutName,
            exerciseList: exerciseList,
        });
    }, [workoutName, exerciseList]);

    const handleSubmitWorkout = () => {
        submitWorkout(workoutData);
        handleShowWorkout(false);
    };

    return (
        <div>
            <div className='ex'>
                <div>
                    Workout Name
                </div>
                <input
                    type="text"
                    onChange={(event) => setWorkoutName(event.target.value)}
                />


                <div>
                    <ExerciseList exerciseData={exerciseList} />
                </div>
                <div>
                    <Exercise handleExercise={handleExercise} />
                </div>

                <div className='submit-workout-button-backgroundcolor'>
                    <button className='submit-workout-button' onClick={handleSubmitWorkout}>Submit Workout</button>
                </div>
            </div>
        </div>
    );
};

export default Workout;