import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import image1 from '../Image/Introduction_image1.png';
import image2 from '../Image/Introduction_image2.jpg';
import image3 from '../Image/info-image1.png';
import image4 from '../Image/info-image2.png';
import image5 from '../Image/info-image3.png';

export default function Introduction() {
    const history = useNavigate()

    const handleCreateWorkout = () => {
        history('signup')
    }

    return (
        <section className='introduction-bg-color'>
            <div className='introduction'>
                <img className='introduction_image1' src={image1} />
                <div className='introduction_text'>
                    <h2 className='introduction_header_color'>Welcome To Qurrit</h2>
                    <h1 className='introduction_sub_color '>We are a ONE STOP SHOP for all your WORKOUT needs</h1>
                </div>
                <img className='introduction_image2' src={image2} />
            </div>
            <div className='center background-brandBlack padding-top-20px'><button onClick={handleCreateWorkout} className='background-brandBlue default-button-rounded'>Create Workouts</button></div>
            <div className='website-working-infos'>

                <div className='website-working-info'>
                    <img className='info_image1' src={image3} />
                    <div >Create Workouts Using the Best Tool</div>
                </div>
                <div className='website-working-info'>
                    <img className='info_image2' src={image4} />
                    <div>Users can search through your Workouts</div>
                </div>
                <div className='website-working-info'>
                    <img className='info_image2' src={image5} />
                    <div> Sell your Workouts Worldwide</div>
                </div>
            </div>
        </section>
    )
}