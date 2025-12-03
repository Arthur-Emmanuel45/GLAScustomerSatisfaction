import React, { useEffect } from 'react';
import './ThankYou.css';
import { useNavigate } from "react-router-dom";
import { speakText } from '../utils/speech';


const ThankYou = () => {
    const navigate = useNavigate();

    useEffect(() => {

        speakText("THANK YOU FOR YOUR TIME");

        const timer = setTimeout(() => {
            navigate("/");  
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className='thank_you_container'>
            <h3>THANK YOU FOR YOUR TIME</h3>
        </div>
    );
}

export default ThankYou;
