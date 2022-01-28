import React from "react";

const ExerciseList = ({ exerciseData }) => {
    return (
        <React.Fragment>
            {exerciseData
                ? exerciseData.map((exercise, index) => (
                    <p className='submitted-exerise' key={index}>{exercise ? exercise.exerciseName : null}</p>
                ))
                : null}
        </React.Fragment>
    );
};

export default ExerciseList;