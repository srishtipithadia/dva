// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ComparisonPage from './components/ComparisonPage';  // Example for another page
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage />} />  {/* Use element prop */}
          <Route path="/comparison" element={<ComparisonPage />} />  {/* Use element prop */}
          <Route path="/results" element={<ResultsPage />} />  {/* Use element prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


