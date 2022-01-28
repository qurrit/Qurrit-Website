import React, { useState } from "react";
import EditExerciseDropdown from "./EditExerciseDropdown";

const EditExercise = ({ exercises, handleChange, workoutIndex }) => {
    const [rerender, setRerender] = useState(true);

    const handleExerciseChange = (id, index) => {
        exercises[index]["exerciseId"] = id.value;
        exercises[index]["exerciseName"] = id.label;
        handleChange(exercises, workoutIndex);
    };

    const handleSetChange = (event, index) => {
        exercises[index]["sets"] = event.target.value;
        handleChange(exercises, workoutIndex);
    };

    const handleRepsChange = (event, index) => {
        exercises[index]["reps"] = event.target.value;
        handleChange(exercises, workoutIndex);
    };

    const handleRestChange = (event, index) => {
        exercises[index]["Rest"] = event.target.value;
        handleChange(exercises, workoutIndex);
    };

    const handleDeleteExercise = (index) => {
        exercises = exercises.splice(index, 1);
        setRerender(!rerender);
        console.log(exercises);
    };

    return (
        <div>
            {exercises
                ? exercises.map((exercise, index) => (
                    <div key={index}>
                        <span className='edit-program-info'>
                            Exercise Name :
                            <EditExerciseDropdown
                                exerciseId={exercise.exerciseId}
                                exerciseName={exercise.exerciseName}
                                exerciseChange={(id) => handleExerciseChange(id, index)}
                            />
                        </span>
                        <div className='edit-program-infos'>
                            <span className='edit-program-info'>
                                Sets :
                                <input
                                    className='progrom-input'
                                    type="number"
                                    defaultValue={exercise.sets}
                                    onChange={(event) => {
                                        handleSetChange(event, index);
                                    }}
                                />
                            </span>
                            <span className='edit-program-info'>
                                Reps :
                                <input
                                    className='progrom-input'
                                    type="number"
                                    defaultValue={exercise.reps}
                                    onChange={(event) => {
                                        handleRepsChange(event, index);
                                    }}
                                />
                            </span>
                            <span className='edit-program-info'>
                                Rest :
                                <input
                                    className='progrom-input'
                                    type="number"
                                    defaultValue={exercise.rest}
                                    onChange={(event) => {
                                        handleRestChange(event, index);
                                    }}
                                />
                            </span>
                        </div>
                        <span>
                            <button onClick={() => handleDeleteExercise(index)}>
                                Delete Exercise
                            </button>
                        </span>
                    </div>
                ))
                : null}
        </div>
    );
};

export default EditExercise;