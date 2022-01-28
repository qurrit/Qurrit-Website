import React from 'react';
import { Link } from 'react-router-dom'


const Workout = ({ program_name, duration, trainer_name, id, image }) => {


    return (
        <div className='grid-item '>
            <div className='grid-workouts-header'>{program_name}</div >
            <div className='grid-workouts-image'>
                <div className="workout-image contain">
                    <img className='workout-image' src={image} />
                </div>
            </div>

            <div className='grid-workouts-bottom'>
                <div className='grid-program-name'>Duration: {duration} months</div>
                <div className='grid-duration'>
                    <div className='grid-button-container'> <Link className='' to={`/workout/${id}`}  >View</Link></div>
                    <div className='grid-trainername'>Made by: {trainer_name} </div>

                </div>
            </div>
        </div>

    );

};

export default Workout;

