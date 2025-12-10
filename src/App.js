import './App.css';
import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import HomeComponent from './HomeComponent/HomeComponent';
import Questionnaires from './QuestionnairesComponent/Questionnaires';
import ThankYou from './ThankYouComponent/ThankYou';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/questions" element={<Questionnaires />} />
            <Route path="/thankYou" element={<ThankYou />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
