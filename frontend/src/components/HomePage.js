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
      <div id="title">
          <div id="page-title">Why Compare Feed Algorithms?</div>
          <p id="why-compare">
          BlueSky, the decentralized microblogging platform, separates itself from larger alternatives like X and Threads by allowing users to customize their news feed using Feed Generators created by other users. Its rapidly-growing user base can select feeds using indexing tools like Goodfeeds, but these tools only surface publicly provided metadata such as likes and follower counts, or information provided by feed maintainers, such as a description. These alone provide no insight as to whether the feeds’ content matches their maintainers’ claims. Therefore, users must trust that a feed generator is fully aligned with its description and their preferences. A tool facilitating critical comparison of different feed generators would promote user confidence and maintainer accountability, while benefiting power users with an interest in aligning their platform experience with their content and health preferences. 
          <br/>
          <br/>
          This application uses BlueSky post and network data to quantify and visualize the differences between custom feed generators by using a data set scraped using the Activity Protocol API, containing post data from over 2,000 publicly accessible feed generators, for a total of roughly 500k posts. Our final product will include comparative visualizations and summary statistics of relevant metrics to give users and researchers a better understanding of the non-obvious factors within each feed generator, supplementing their ability to make an informed choice of which feed generator option to pick from a set of alternatives. 
          </p>
      </div> 
      <div class="benefits-container">
        <div class="benefit-row-1">
          <div class="benefit-card">
            <h2 class="text-lg font-semibold">Benefit 1</h2>
            <p>Some description here.</p>
          </div>
          <div class="benefit-card">
            <h2 class="text-lg font-semibold">Benefit 3</h2>
            <p>Some description here.</p>
          </div>
        </div>
        <div class="benefit-row-2">
          <div class="benefit-card">
            <h2 class="text-lg font-semibold">Benefit 2</h2>
            <p>Some description here.</p>
          </div>
          <div class="benefit-card">
            <h2 class="text-lg font-semibold">Benefit 4</h2>
            <p>Some description here.</p>
          </div>
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
