import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from './HomeComponent/HomeComponent';
import Questionnaires from './QuestionnairesComponent/Questionnaires';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/questions" element={<Questionnaires />} />
          </Routes>
      </Router>    
    </div>
  );
}

export default App;
