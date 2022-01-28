import React, { useState } from "react";

import EditExercise from "./EditExercise";

const EditProgram = ({ showEditProgram, workoutData, setWorkoutList }) => {

    const [rerender, setRerender] = useState(true);

    const [edittingIndex, setEdittingIndex] = useState([]);

    const editIndex = (index) => {
        var temp = edittingIndex
        temp.push(index)
        setEdittingIndex(temp)
        setRerender(!rerender)
    }

    const unEditIndex = (index) => {
        var temp = edittingIndex
        temp = temp.filter((ele) => !(ele === index))
        setEdittingIndex(temp)

    }


    const handleWorkoutNameChange = (event, index) => {
        let temp = workoutData;
        temp[index]["workoutName"] = event.target.value;

        setWorkoutList(temp);
    };

    const handleExerciseChange = (exercises, index) => {
        let temp = workoutData;
        temp[index]["exerciseList"] = exercises;

        setWorkoutList(temp);
    };

    const handleDeleteWorkout = (index) => {
        console.log(index);
        let temp = workoutData;
        temp.splice(index, 1);


        setWorkoutList(temp);
        setRerender(!rerender);
    };

    return (

        <div>
            <div>
                <button className='add-workout-button' onClick={() => showEditProgram(false)}>Edit done</button>
            </div>
            {workoutData
                ? workoutData.map((workout, index) => (
                    <div className='submitted-workout-list'>
                        {edittingIndex.includes(index) ?

                            <div key={index}>
                                {console.log('hi')}
                                <div key={index}>
                                    Workout Name :{" "}
                                    <input
                                        type="text"
                                        defaultValue={workout.workoutName}
                                        onChange={(event) => handleWorkoutNameChange(event, index)}
                                    />
                                    <button onClick={() => handleDeleteWorkout(index)}>
                                        Delete Workout
                                    </button>

                                    <EditExercise
                                        exercises={workout.exerciseList}
                                        workoutIndex={index}
                                        handleChange={handleExerciseChange}
                                    />

                                </div>

                                <button className='edit-program-button' onClick={() => unEditIndex(index)}>Close Edit</button>
                            </div>
                            : <div>
                                <p key={index}>{workout.workoutName} </p>
                                <button className='edit-program-button' onClick={() => editIndex(index)}>Edit</button>
                            </div>}
                    </div>

                ))
                : null}

        </div>
    );
};

export default EditProgram;