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
        <span>RGBSky</span>
      </nav>
      <div id="title">
          <div id="page-title">Why Compare Feed Algorithms?</div>
          <p id="why-compare">
          BlueSky lets you pick your OWN feed generator, which is a great step in the right direction of giving us greater control over our social media experiences. But, don't you wish you had more information to work with than Likes and Number of Posts? Pick two feed generators, and RGBSky will visualize how they compare across relevant dimensions, like toxicity and manipulation from the standard chronological order, so you can make a more informed choice!
          </p>
      </div> 
      <div class="benefits-container">
        <div class="benefit-card" style={{width: "300px"}}>
          <h2 class="text-lg font-semibold" style={{marginBottom: "20px"}}>Algorithmic Sovereignty Without Blind Trust</h2>
          <p>Ensure that your choice of feed generator is the correct one for you.</p>
        </div>
        <div class="benefit-card">
          <h2 class="text-lg font-semibold" style={{marginBottom: "18px"}}>Better Information, Quicker</h2>
          <p>Don't wait to find out that a feed generator is very toxic. Find out with our quick automated tool!</p>
        </div>
        <div class="benefit-card">
          <h2 class="text-lg font-semibold" style={{marginBottom: "45px"}}>For Researchers</h2>
          <p>Understand how different communities on BlueSky show different characteristics.</p>
        </div>
      </div>
      <footer>
          <h2>FAQ</h2>
          <p>Medium length question goes here</p>
      </footer>
    </div>
  );
}

export default HomePage;
