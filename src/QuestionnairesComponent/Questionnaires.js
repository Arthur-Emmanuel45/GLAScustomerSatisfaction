import React, {useState} from 'react';
import StarRating from '../StarRatingComponent/StarRating';
import './Questionnaires.css';

const Questionnaires = () => {
    const [currentSection, setCurrentSection] = useState(0); // track which section you're on
    const [formData, setFormData] = useState({
        category: "",
        otherCategory: "",
        locality: "",
        municipality: "",
        gender: "",
        overall_satisfaction: "",
        recommendation: "",
    })
    //Define heading for the questions
    const ratingSectionHeadings = [
        "Transparency",
        "Cost of Service",
        "Value for Money",
        "Service Delivery",
    ];

    // Define questions grouped by sections
    const ratingSections = [
        [
            { id: 5, text: "The standard service charges offered at the CSAU are clearly published and known to clients." },
            { id: 6, text: "Payments made at the CSAU reflect standardized and official charges" },
            { id: 7, text: "Receipts are provided for all payments made at the CSAU." },
            { id: 8, text: "The CSAU provides regular updates on the progress of services requested (e.g., via call, text, or social media)." },
            { id: 9, text: "The CSAU meets the timelines communicated for service delivery." },
        ],

        [
            { id: 10, text: "How would you rate the affordability of the fees associated with document processing?" },
            { id: 11, text: "How satisfactory are the ongoing operational costs associated with the system (e.g., maintenance, updates, and support)?" },
            { id: 12, text: "How clear are the cost structures for the services provided by the land administration system?" },
        ],

        [
            { id: 13, text: "Do you feel that the quality of service justifies the costs involved?" },
            { id: 14, text: "How would you rate the overall value for money of the services provided by CSAU?" },
        ],

        [
            { id: 15, text: "How would you evaluate the availability and reliability of the staff at CSAU for service delivery" },
            { id: 16, text: "From your observation, how would you rate the responsiveness of service providers to serve the customers?" },
            { id: 17, text: "How would you reate the speed of service on turn-around time?" },
            { id: 18, text: "How would you rate the level of accuracy, quality on prepared documents deliverd by the CSAU" },
            { id: 19, text: "How would you rate the service delivered by the CSAU in terms of value for money?" },
        ],
    ]

    // handle demographic text or radio input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // handle star ratings
    const handleRatingChange = (id, rating) => {
        setFormData((prev) => ({
        ...prev,
        ratings: { ...prev.ratings, [id]: rating },
        }));
    };


    const handleNext = () => {
        if (currentSection < 5) setCurrentSection(currentSection + 1);
    };

    const handlePrev = () => {
        if (currentSection > 0) setCurrentSection(currentSection - 1);
    };

    const handleSubmit = () => {
        alert("Your responses:\n" + JSON.stringify(formData, null, 2));
    };

    return (
        <div className='question_container'>
            {currentSection === 0 && (
                <div className='section_1'>
                    {/* <h2>{currentSection === 0
                        ? "Section 1: Demographic Information"
                        : `Section ${currentSection + 1}: Questionnaire`}
                    </h2> */}
                    <h2>Demographic Information</h2>
                    <div className="screener">
                        <label>Category of CSAU user?</label>
                        <div>
                            {["Customer", "Agent", "CSAU Officer / Service provider"].map((cat) => (
                                <label key={cat} className="">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat}
                                        checked={formData.category === cat}
                                        onChange={handleInputChange}
                                    />
                                    {cat}
                                </label>
                            ))}

                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Other"
                                    checked={formData.category === "Other"}
                                    onChange={handleInputChange}
                                />
                                Other:
                                {formData.category === "Other" && (
                                    <input
                                        className="other_input"
                                        type="text"
                                        name="otherCategory"
                                        value={formData.otherCategory || ""}
                                        onChange={handleInputChange}
                                        placeholder="Please specify"
                                    />
                                )}
                            </label>
                        </div>
                    </div>

                    <div className=' form_questions locality'>
                        <label className="">What the locality of your parcel of Land?</label>
                        <input
                            type="text"
                            name="locality"
                            value={formData.locality}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form_questions municipality'>
                        <label className="">Name of the municipality or metropolis?</label>
                        <input
                            type="text"
                            name="municipality"
                            value={formData.municipality}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='gender'>
                        <label className="block font-semibold">Gender : </label>
                        <div>
                            {["Male", "Female"].map((g) => (
                                <label key={g} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={formData.gender === g}
                                        onChange={handleInputChange}
                                    />
                                    {g}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Sections 2 & 3 — Rating Questions */}
            {currentSection >= 1 && currentSection <= 3  && (
                <div>
                    <h2>
                        {ratingSectionHeadings[currentSection - 1]}
                    </h2>
                    {
                        ratingSections[currentSection - 1].map((q) => (
                            <StarRating
                                key={q.id}
                                question={q.text}
                                onChange={(rating) => handleRatingChange(q.id, rating)}
                            />
                        ))
                    }
                </div>
            )}

            {currentSection === 4 && (
                <div className='section_2'>
                    <h2>Overall Customer Satisfaction</h2>
                    <div className='os'>
                        <label className="">What is your overall customer satisfaction services at the CSAU?</label>
                        <input
                            type="text"
                            name="overall_satisfaction"
                            value={formData.overall_satisfaction}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            )}

            {currentSection === 5 && (
                <div className='section_3'>
                    <h2>Recommendations</h2>
                    <div className='recommend'>
                        <label className="">What would you recommend for imporving services at the CSAU?</label>
                        <input
                            type="text"
                            name="recommendation"
                            value={formData.recommendation}
                            onChange={handleInputChange}
                       />
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="buttons">
                {currentSection > 0 && (
                    <button
                        onClick={handlePrev}
                        className="all_buttons prev_button"
                    >
                        Previous
                    </button>
                )}

                {currentSection < 5 ? (
                <button
                    onClick={handleNext}
                    className="all_buttons nxt_button"
                >
                    Next
                </button>
                ) : (
                <button
                    onClick={handleSubmit}
                    className="all_buttons submit_button"
                >
                    Submit
                </button>
                )}
            </div>
        </div>
    );
}

export default Questionnaires;
