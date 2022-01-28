import React from "react";

const ExerciseList = ({ names }) => {
    return <div className='submitted-exerise'>{names ? names.map((name) => <div>{name}</div>) : null}</div>;
};

export default ExerciseList;