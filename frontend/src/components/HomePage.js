import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => { 
    localStorage.removeItem("selectedFeeds");
    navigate('/'); 
  };

  const goToComparisonPage = () => { 
    localStorage.removeItem("selectedFeeds");
    navigate('/comparison'); 
  };

  return (
    <div className="homepage">
      <nav>
        <div id="nav-links">
            <a onClick={goToHomePage}> About Us</a>
            <a onClick={goToComparisonPage}>Comparison Tool</a>
        </div>
        <span>Project Title</span>
      </nav>
      <header>
          <h1>Why Compare Feeds?</h1>
          <p>Compare different feeds to get the best insights.</p>
          <button id="compare-btn">Comparison Tool</button>
      </header>
      <section class="benefits">
          <div><h2>Benefit 1</h2><p>Some description here.</p></div>
          <div><h2>Benefit 2</h2><p>Some description here.</p></div>
          <div><h2>Benefit 3</h2><p>Some description here.</p></div>
          <div><h2>Benefit 4</h2><p>Some description here.</p></div>
      </section>
      <footer>
          <h2>FAQ</h2>
          <p>Medium length question goes here</p>
      </footer>
    </div>
  );
}

export default HomePage;
