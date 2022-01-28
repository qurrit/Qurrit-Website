import React, { useEffect, useState } from "react";

const WorkoutList = ({ workout }) => {
    const [name, setName] = useState([]);

    useEffect(() => {
        setName(workout.map((workout) => workout.name));
    }, [workout]);

    return (
        <div >
            <div >
                {name.map((name) => (
                    <div className='submitted-workout-list'>{name}</div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutList;