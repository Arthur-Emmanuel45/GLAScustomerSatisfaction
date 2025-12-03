import React, {useState} from 'react';
import { FaStar } from "react-icons/fa";
import './StarRating.css';

const StarRating = ({question, onChange, language="en"}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    // Automatically read the question when it appears
    // useEffect(() => {
    //     speakText(question, language);
    // }, [question, language]);

    const handleRating = (num) => {
        setRating(num);
        if (typeof onChange === "function") onChange(num);   // send rating back to parent
    };

    return (
        <div className='rating_container'>
            <p>{question}</p>
            <div className="star_rating">
                {[1, 2, 3, 4, 5].map((num) => (
                    <FaStar
                        key={num}
                        size={30}
                        color={num <= (hover || rating) ? "#FFD700" : "#ccc"}
                        className="rating_transition"
                        onMouseEnter={() => setHover(num)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => handleRating(num)}
                    />
                ))}
            </div>        
        </div>
    );
}

export default StarRating;