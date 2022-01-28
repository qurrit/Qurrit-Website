import React, { Component } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination-position'>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <div key={number}>
                        <button className='pageNumber' onClick={() => paginate(number)} >{number}</button>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;