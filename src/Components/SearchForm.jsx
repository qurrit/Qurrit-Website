import React, { Component } from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
    const { setSearchTerm } = useGlobalContext()
    const searchValue = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault()
    }

    const searchWorkout = () => {
        setSearchTerm(searchValue.current.value)
    }
    return (
        <section >
            <form onSubmit={handleSubmit}>
                <div className='searchbar'>
                    <label className='search-font' htmlFor='name'>
                        Search For Desired Workout
                    </label>
                    <input className='search' type='text' id='name' ref={searchValue} onChange={searchWorkout} />
                </div>
            </form>
        </section>
    )
}

export default SearchForm