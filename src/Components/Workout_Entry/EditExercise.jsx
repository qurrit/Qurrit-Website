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
        <div className='margin-top-20px'>
            {exercises
                ? exercises.map((exercise, index) => (
                    <div className='margin-top-20px' key={index}>
                        <div className='edit-program-info'>
                            Exercise Name :
                            <EditExerciseDropdown
                                exerciseId={exercise.exerciseId}
                                exerciseName={exercise.exerciseName}
                                exerciseChange={(id) => handleExerciseChange(id, index)}
                            />
                        </div>
                        <div className='edit-program-infos'>
                            <div className='edit-program-info'>
                                <div>
                                    Sets :
                                </div>
                                <input
                                    className='program-input'
                                    type="number"
                                    defaultValue={exercise.sets}
                                    onChange={(event) => {
                                        handleSetChange(event, index);
                                    }}
                                />

                            </div>
                            <div className='edit-program-info'>
                                <div>
                                    Reps :
                                </div>
                                <input
                                    className='program-input'
                                    type="number"
                                    defaultValue={exercise.reps}
                                    onChange={(event) => {
                                        handleRepsChange(event, index);
                                    }}
                                />
                            </div>
                            <div className='edit-program-info'>
                                <div>
                                    Rest :
                                </div>
                                <input
                                    className='program-input'
                                    type="number"
                                    defaultValue={exercise.rest}
                                    onChange={(event) => {
                                        handleRestChange(event, index);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="margin-top-10px">
                            <button className='default-button background-red ' onClick={() => handleDeleteExercise(index)}>
                                Delete Exercise
                            </button>
                        </div>
                    </div>
                ))
                : null}
        </div>
    );
};

export default EditExercise;