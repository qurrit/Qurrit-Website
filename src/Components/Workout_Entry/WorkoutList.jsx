const WorkoutList = ({ workoutTable }) => {
    return (
        <div >
            {workoutTable
                ? workoutTable.map((workout, index) => (
                    <p className='submitted-workout-list center' key={index}>{workout.workoutName} </p>
                ))
                : null}
        </div>
    );
};

export default WorkoutList;