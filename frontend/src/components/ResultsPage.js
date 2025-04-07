import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Comparison from "./Comparison";
import PoliticalCompass from "./PoliticalCompass";
import './style.css';

const ResultsPage = () => {
  const navigate = useNavigate();
  
  const goToHomePage = () => { 
    localStorage.removeItem("selectedFeeds");
    navigate('/'); 
  };

  const goToComparisonPage = () => { 
    localStorage.removeItem("selectedFeeds");
    navigate('/comparison'); 
  };

  const location = useLocation();
  const { selectedFeeds } = location.state || { selectedFeeds: [] };
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/feed_data")
        .then((response) => response.json())
        .then(data => setFeeds(data))
        .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="resultspage">
      <nav>
        <div id="nav-links">
            <a onClick={goToHomePage}> About Us</a>
            <a onClick={goToComparisonPage}>Comparison Tool</a>
        </div>
        <span>RGBSky</span>
      </nav>
      <div id="results-title">
          <div id="page-title">Feed Comparison Results</div>
      </div> 

      <div class="feeds-comparison-container">
        {selectedFeeds.length === 2 && (
          <Comparison feed1={selectedFeeds[0]} feed2={selectedFeeds[1]} />
        )}
      </div>

      <div className="all-feeds-container">
        <PoliticalCompass feeds={feeds} />
      </div>
    </div>
  );
}

export default ResultsPage;
