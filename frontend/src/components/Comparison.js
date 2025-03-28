import React, { useState, useEffect } from 'react';

const Comparison = ({ feed1, feed2 }) => {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);

    const metrics = ["likes", "posts", "toxicity_score", "positivity_score", "commercial_link_score", "poster_diversity_score"];
    const percentageMetrics = ["toxicity_score", "positivity_score", "commercial_link_score", "poster_diversity_score"];

    useEffect(() => {
        setLoading(true);
        fetch("http://127.0.0.1:5000/api/normalized_data")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Data:", data);
                setAllData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading data...</p>;

    if (!allData.length) return <p>No data available.</p>;

    const getColor = (feedId, metric, allValues) => {
        let scaledFeedData = allData.find(x => x.feed_id === feedId) || {};
        let value = scaledFeedData[metric];

        if (value === undefined || !allValues.length) return "white"; 

        const sorted = [...allValues].sort((a, b) => a - b);
        const index = sorted.findIndex(v => v >= value);
        const percentile = (index / sorted.length) * 100;

        if (percentile >= 90) return "#4caf50";
        if (percentile >= 80) return "#81c784";
        if (percentile >= 60) return "#ffeb3b";
        if (percentile >= 40) return "#ff9800";
        if (percentile >= 20) return "#f44336";
        return "#e57373";
    };

    const formatAsPercentage = (value) => {
        if (value !== undefined) {
            return `${(value * 100).toFixed(2)}%`;
        }
        return "N/A";
    };

    const capitalize = (str) => {
        return String(str).charAt(0).toUpperCase() + String(str).slice(1);
    }

    return (
        <div>
            {feed1 && feed2 ? (
                <table border="1" style={{ width: "700px", textAlign: "center", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{width: "200px"}}>Metric</th>
                            <th>
                                <div class="feed-title-circle">Category: {capitalize(feed1.category)}</div>
                                <div class="feed-title-circle">Algorithm: {capitalize(feed1.algorithm)}</div>
                            </th>
                            <th>
                                <div class="feed-title-circle">Category: {capitalize(feed2.category)}</div>
                                <div class="feed-title-circle">Algorithm: {capitalize(feed2.algorithm)}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {metrics.map(metric => {
                            const allMetricValues = allData.map(feed => feed[metric]).filter(val => val !== undefined);

                            return (
                                <tr key={metric}>
                                    <td>{metric.replaceAll("_", " ")}</td>
                                    <td>
                                        <div class="comparison-circle" style={{ backgroundColor: getColor(feed1.feed_id, metric, allMetricValues) }}>
                                            {percentageMetrics.includes(metric) ? 
                                                formatAsPercentage(feed1[metric]) : 
                                                feed1[metric] !== undefined ? feed1[metric] : "N/A"}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="comparison-circle" style={{ backgroundColor: getColor(feed2.feed_id, metric, allMetricValues) }}>
                                            {percentageMetrics.includes(metric) ? 
                                                formatAsPercentage(feed2[metric]) : 
                                                feed2[metric] !== undefined ? feed2[metric] : "N/A"}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Please select two feeds to compare.</p>
            )}
        </div>
    );
};

export default Comparison;
