import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", //  backend URL
});

// Submit survey response
export const submitSurvey = async (formData) => {
    const { data } = await API.post("/surveyApi/submit", formData);
    return data;
};
