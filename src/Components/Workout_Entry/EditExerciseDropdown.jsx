import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";

const EditExerciseDropdown = ({ exerciseId, exerciseName, exerciseChange }) => {
    const [exercise, setExercise] = useState([]);

    let exercise_option = [];

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(
                "https://qurrit-react.herokuapp.com/api/exercises"
            );
            let data = await response.json();
            setExercise(data);
        }
        fetchData();
    }, []);

    exercise.map((ex) =>
        exercise_option.push({
            label: ex.name,
            value: ex.id,
        })
    );

    return (
        <div>
            <Select
                className='ex-drop-down'
                options={exercise_option}
                placeholder="Select Exercise"
                isSearchable
                maxMenuHeight={150}
                defaultValue={{ label: exerciseName, value: exerciseId }}
                onChange={exerciseChange}
            />
        </div>
    );
};

export default EditExerciseDropdown;