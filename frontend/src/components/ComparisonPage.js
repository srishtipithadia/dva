import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedSelector from "./FeedSelector";
import './style.css';

const ComparisonPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => { 
    localStorage.removeItem("selectedFeeds");
    navigate('/'); 
  };

  const goToComparisonPage = () => { 
    localStorage.removeItem("selectedFeeds");
    navigate('/comparison'); 
  };

  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="comparisonpage">
      <nav>
        <div id="nav-links">
            <a onClick={goToHomePage}> About Us</a>
            <a onClick={goToComparisonPage}>Comparison Tool</a>
        </div>
        <span>Project Title</span>
      </nav>
      <div id="title">
          <div id="page-title">Feed Comparison Tool</div>
          <p>Select two feeds to compare from the categories below:</p>

          <div id="category-buttons">
            {["all", "general", "sports", "news", "entertainment"].map((category) => (
              <div
                key={category}
                className={`category-button button ${selectedCategory === category ? "selected" : ""}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            ))}
          </div>
      </div> 

      <div class="feeds-container">
        <FeedSelector key={selectedCategory} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

export default ComparisonPage;
