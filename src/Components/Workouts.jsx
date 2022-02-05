import React, { useState, useEffect } from 'react'
import Workout from './Workout'
import Pagination from './Pagination'

import { useGlobalContext } from '../context'

const url = '/api/programs'

function Workouts() {

    const { workouts, loading } = useGlobalContext();




    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = workouts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {

        return (<div>loading</div>)

    }

    if (workouts.length < 1) {
        return (<div className='center background-brandLightBlue padding-20px'>This is not available, search for another workout</div>)
    }

    return (
        <section className='workouts'>
            <div className='grid-container'>
                {currentPosts.map((workout) => {
                    return <Workout key={workout.id} {...workout}></Workout>
                })
                }
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={workouts.length} paginate={paginate} />
        </section>
    )
};


export default Workouts;