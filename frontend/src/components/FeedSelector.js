import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const FeedSelector = ({ selectedCategory }) => {
    const navigate = useNavigate();

    const [feeds, setFeeds] = useState([]);
    const [filteredFeeds, setFilteredFeeds] = useState([]);
    const [selectedFeeds, setSelectedFeeds] = useState(() => {
        const savedFeeds = localStorage.getItem("selectedFeeds");
        return savedFeeds ? JSON.parse(savedFeeds) : [];
    });

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/feed_data")
            .then((response) => response.json())
            .then(data => {
                setFeeds(data);
                setFilteredFeeds(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        setFilteredFeeds(feeds.filter(feed => selectedCategory === "all" || feed.category === selectedCategory));
    }, [selectedCategory, feeds]);

    useEffect(() => {
        localStorage.setItem("selectedFeeds", JSON.stringify(selectedFeeds));
    }, [selectedFeeds]);

    useEffect(() => {
        const handleBeforeUnload = () => {
          localStorage.removeItem("selectedFeeds");
        };
      
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    const handleSelectFeed = (feed) => {
        const isSelected = selectedFeeds.some(selected => selected.feed_id === feed.feed_id);
    
        if (isSelected) {
          setSelectedFeeds(selectedFeeds.filter(selected => selected.feed_id !== feed.feed_id));
        } else if (selectedFeeds.length < 2) {
          setSelectedFeeds([...selectedFeeds, feed]);
        }
    };

    const clickCompare = () => {
        console.log(selectedFeeds);
        navigate("/results", { state: { selectedFeeds } });
    };

    return (
        <div>
            <div className="feed-grid">
            {filteredFeeds.length > 0 ? (
                filteredFeeds.map(feed => (
                <div
                key={feed.feed_id}
                className={`feed-card ${selectedFeeds.some(selected => selected.feed_id === feed.feed_id) ? "selected" : ""}`}
                onClick={() => handleSelectFeed(feed)}
                >
                    <h2 className="text-lg font-semibold">{feed.category.toUpperCase()}</h2>
                    <p>Algorithm: {feed.algorithm}</p>
                    <p>Likes: {feed.likes}</p>
                    <p>Posts: {feed.posts}</p>
                    <p>Toxicity Score: {feed.toxicity_score}</p>
                    <p>Positivity Score: {feed.positivity_score}</p>
                </div>
                ))
            ) : (
                <p>No feeds available for this category.</p>
            )}
            </div>

            <div>
            {selectedFeeds.length > 0 ? (
                filteredFeeds.map(feed => (
                    <div class="selected-feeds">
                        <div id="selected-feeds-title">Selected Feeds:</div>
                        <div class="selected-feeds-container">
                        {selectedFeeds.map(feed => (
                            <div className="display feed-card">
                                <h2 className="text-lg font-semibold">{feed.category.toUpperCase()}</h2>
                                <p>Algorithm: {feed.algorithm}</p>
                                <p>Likes: {feed.likes}</p>
                                <p>Posts: {feed.posts}</p>
                                <p>Toxicity Score: {feed.toxicity_score}</p>
                                <p>Positivity Score: {feed.positivity_score}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                ))
            ) : (
                <div></div>
            )}
            </div>

            <div>
            {selectedFeeds.length == 2 ? (
                <div class="compare-container">
                    <div key="compare"
                         onClick={clickCompare} 
                         className="compare-button button">
                    Compare
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            </div>
        </div>
    );
};

export default FeedSelector;
