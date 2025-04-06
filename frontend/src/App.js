import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ComparisonPage from './components/ComparisonPage';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  { }
          <Route path="/" element={<HomePage />} />  { }
          <Route path="/comparison" element={<ComparisonPage />} />  { }
          <Route path="/results" element={<ResultsPage />} />  { }
        </Routes>
      </div>
    </Router>
  );
}

export default App;


