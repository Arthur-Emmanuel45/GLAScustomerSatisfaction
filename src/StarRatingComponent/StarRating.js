import React, {useState} from 'react';
import { FaStar } from "react-icons/fa";
import './StarRating.css';

const StarRating = ({question, onChange}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
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
                        onClick={() => {
                            setRating(num);
                            onChange(num);
                        }}
                    />
                ))}
            </div>        
        </div>
    );
}

export default StarRating;