import React, { Component } from 'react';
import image1 from '../Image/Workout_Introduction_image1.png';


export default function Introduction() {
    return (
        <section className='introduction-bg-color'>
            <div className='introduction workout-introduction'>
                <img className='workout_introduction_image1' src={image1} />
                <div className='introduction_text'>
                    <h2 className='introduction_header_color'>Workout Made by Experienced Fitness Instructor</h2>
                    <h3 className='introduction_sub_color '>Thoughtfully crafted workout</h3>
                </div>
            </div>
        </section>
    )
}