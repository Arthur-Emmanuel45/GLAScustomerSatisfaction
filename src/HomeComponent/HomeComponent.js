import React from 'react';
import './HomeComponent.css';
import { useNavigate } from "react-router-dom";


const HomeComponent = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/questions"); // navigate to the questionnaire page
    };

    return (
        <div className='home'>
            <div className='home_container'>
                <h1>Customer Satisfaction Survey on the Ghana Land Administration System</h1>

                <p>Thank you for taking the time to participate in this important survey.</p>
                <p>Your feedback is valuable and will help us improve our services.</p>
                <p>Please note that there are no right or wrong answers, only your honest and thoughtful opinions.</p>
                <p>This survey will take approximately 2-5 minutes to complete.</p>
                <p>We appreciate your generous support and contribution.</p>
                <p>Press “Start Now” to begin the survey.</p>
                
                <button className='home_button' onClick={handleStart}>Start Now</button>
            </div>
        </div>
    );
}

export default HomeComponent;
