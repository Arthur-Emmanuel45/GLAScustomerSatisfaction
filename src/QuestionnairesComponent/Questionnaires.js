import React, {useState, useEffect} from 'react';
import StarRating from '../StarRatingComponent/StarRating';
import './Questionnaires.css';
import { submitSurvey } from "../api/surveyApi";
import { useNavigate } from "react-router-dom";
import { speakText } from '../utils/speech';

const Questionnaires = () => {
    const [currentSection, setCurrentSection] = useState(0); // track which section you're on
    const [language, setLanguage] = useState("en");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: "",
        otherCategory: "",
        locality: "",
        municipality: "",
        gender: "",
        ratings: {},
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
            { id: 'T1', text: "The standard service charges offered at the CSAU are clearly published and known to clients." },
            { id: 'T2', text: "Payments made at the CSAU reflect standardized and official charges" },
            { id: 'T3', text: "Receipts are provided for all payments made at the CSAU." },
            { id: 'T4', text: "The CSAU provides regular updates on the progress of services requested (e.g., via call, text, or social media)." },
            { id: 'T5', text: "The CSAU meets the timelines communicated for service delivery." },
        ],

        [
            { id: 'CO1', text: "How would you rate the affordability of the fees associated with document processing?" },
            { id: 'CO2', text: "How satisfactory are the ongoing operational costs associated with the system (e.g., maintenance, updates, and support)?" },
            { id: 'CO3', text: "How clear are the cost structures for the services provided by the land administration system?" },
        ],

        [
            { id: 'VM1', text: "Do you feel that the quality of service justifies the costs involved?" },
            { id: 'VM2', text: "How would you rate the overall value for money of the services provided by CSAU?" },
        ],

        [
            { id: 'SD1', text: "How would you evaluate the availability and reliability of the staff at CSAU for service delivery" },
            { id: 'SD2', text: "From your observation, how would you rate the responsiveness of service providers to serve the customers?" },
            { id: 'SD3', text: "How would you reate the speed of service on turn-around time?" },
            { id: 'SD4', text: "How would you rate the level of accuracy, quality on prepared documents deliverd by the CSAU" },
            { id: 'SD5', text: "How would you rate the service delivered by the CSAU in terms of value for money?" },
        ],
    ]
    
    // Speak automatically when a new section loads
    useEffect(() => {
        if (currentSection === 0) {
            speakText("Please provide your demographic information.", language);
            return;
        }
        
        if (currentSection >= 1 && currentSection <= 4) {
            const heading = ratingSectionHeadings[currentSection - 1];
            const prehab = "To what extent do you rate the following attitudinal statement";
            const firstQuestion = ratingSections[currentSection - 1][0].text;
            speakText(heading, language);

            setTimeout(() => {
                speakText(prehab, language);
            }, 1200)

            setTimeout(() => {
                speakText(firstQuestion, language);
            }, 5400)
        }
        
        if (currentSection === 5) {
            speakText("What is your overall customer satisfaction services at the CSAU?.", language);
        } else if (currentSection === 6) {
            speakText("What would you recommend for imporving services at the CSAU?.", language);
        }
    }, [currentSection, language]);

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

        // Play next question automatically
        const sectionIndex = currentSection - 1;
        if (sectionIndex < 0 || sectionIndex >= ratingSections.length){
            return;
        }
        const currentIndex = ratingSections[sectionIndex].findIndex(q => q.id === id);
        const nextQuestion = ratingSections[sectionIndex][currentIndex + 1];

        if (nextQuestion) {
            speakText(nextQuestion.text, language);
        } else {
            speakText("Please click Next to proceed to the next section.", language);
        }
    };

    const handleNext = () => {
        // Prevent moving forward unless section complete
        if (currentSection >= 1 && currentSection <= 4) {
            const unanswered = ratingSections[currentSection - 1].filter(
                (q) => !formData.ratings[q.id]
            );
            if (unanswered.length > 0) {
                speakText("Please answer all questions before proceeding", language);
                alert("Please answer all questions before proceeding.");
                return;
            }
        }


        if (currentSection === 0) {
            if (!formData.category || !formData.locality || !formData.municipality || !formData.gender) {
                speakText("Plase complete all demographic fields.", language)
                alert("Please complete all demographic fields.");
                return;
            }
        }
        if (currentSection < 6) setCurrentSection(currentSection + 1);
    };

    const handlePrev = () => {
        if (currentSection > 0) setCurrentSection(currentSection - 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await submitSurvey(formData);
            // alert("Survey submitted successfully!");
            // console.log("Response saved:", response);
            navigate("/thankYou");
        } catch (error) {
            console.error("Submission failed:", error.response?.data || error.message);
            alert("Failed to submit survey. Please try again.");
        }
    };


    return (
        <div className='question_container'>
            {currentSection === 0 && (
                <div className='section_1'>
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
            {/* Sections  Rating Questions */}
            {currentSection >= 1 && currentSection <= 4  && (
                <div>
                    <h2>
                        {ratingSectionHeadings[currentSection - 1]}
                    </h2>
                    <p className='question_statement'>To what extent do you rate the following attitudinal statement?</p>
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

            {currentSection === 5 && (
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

            {currentSection === 6 && (
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

                {currentSection < 6 ? (
                <button
                    onClick={handleNext}
                    className="all_buttons nxt_button"
                >
                    Next
                </button>
                ) : (
                <button
                    type="submit"
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
