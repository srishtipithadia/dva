import React, { useState, useEffect } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, Label } from 'recharts';

const Comparison = ({ feed1, feed2 }) => {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);

    const metrics = ["likes", "number_of_posts", "toxicity_score", "positivity_score", "subjectivity_score", "poster_diversity_score", "reverse_chrono_score"];
    const percentageMetrics = ["toxicity_score", "positivity_score", "subjectivity_score", "poster_diversity_score", "reverse_chrono_score"];

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

    const getMetricDescription = (metric) => {
        switch (metric) {
            case "likes":
                return "The total number of likes received on posts.";
            case "number_of_posts":
                return "The total number of posts made by the feed.";
            case "toxicity_score":
                return "Measures the level of toxic language used in the posts.";
            case "positivity_score":
                return "Measures the positivity or optimism in the posts.";
            case "subjectivity_score":
                return "The proportion of posts with commercial links.";
            case "poster_diversity_score":
                return "The diversity of the users posting content.";
            case "reverse_chrono_score":
                return "The similarity to a feed ordered chronologically.";
            default:
                return "No description available.";
        }
    };

    const getColor = (uri, metric, allValues) => {
        let scaledFeedData = allData.find(x => x.uri === uri) || {};
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

    const CustomBarLabel = ({ x, y, width, value, label }) => {
        if (value === 0 || value === undefined) return null;
        return (
            <text
                x={x + width / 2}
                y={y - 6}
                fill="#333"
                textAnchor="middle"
                fontSize="12px"
                fontWeight="bold"
                color= "#182451" 
            >
                {label}
            </text>
        );
    };    

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || payload.length === 0) return null;
    
        return (
            <div style={{ background: "#fff", border: "1px solid #ccc", padding: "8px", borderRadius: "6px", color: "#182451" }}>
                <strong>{label}</strong>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {payload.map((entry, index) => {
                        const feedLabel = entry.dataKey === "feed1" ? "Feed 1" : "Feed 2";
                        return (
                            <li key={index} style={{ color: entry.color }}>
                                {feedLabel}: {(entry.value * 100).toFixed(1)}%
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <div class="results-table">
                {feed1 && feed2 ? (
                    <table border="1" style={{ width: "800px", textAlign: "center", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{width: "200px"}}>Metric</th>
                                <th>
                                    <div class="feed-title-circle">Category: {capitalize(feed1.topic)}</div>
                                    <div class="feed-title-circle">Feed: {capitalize(feed1.display_name)}</div>
                                </th>
                                <th>
                                    <div class="feed-title-circle">Category: {capitalize(feed2.topic)}</div>
                                    <div class="feed-title-circle">Feed: {capitalize(feed2.display_name)}</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map(metric => {
                                const allMetricValues = allData.map(feed => feed[metric]).filter(val => val !== undefined);
                                const metricDescription = getMetricDescription(metric);

                                return (
                                    <tr key={metric}>
                                        <td data-tooltip-id={metric} data-tooltip-content={metricDescription} style={{ cursor: 'pointer' }}>
                                            {metric.replaceAll("_", " ")}
                                        </td>
                                        <td>
                                            <div class="comparison-circle" style={{ backgroundColor: getColor(feed1.uri, metric, allMetricValues) }}>
                                                {percentageMetrics.includes(metric) ? 
                                                    formatAsPercentage(feed1[metric]) : 
                                                    feed1[metric] !== undefined ? feed1[metric] : "N/A"}
                                            </div>
                                        </td>
                                        <td>
                                            <div class="comparison-circle" style={{ backgroundColor: getColor(feed2.uri, metric, allMetricValues) }}>
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

                <ReactTooltip id="likes" />
                <ReactTooltip id="number_of_posts" />
                <ReactTooltip id="toxicity_score" />
                <ReactTooltip id="positivity_score" />
                <ReactTooltip id="subjectivity_score" />
                <ReactTooltip id="poster_diversity_score" />
                <ReactTooltip id="reverse_chrono_score" />
            </div>

            <div class="results-bar-chart">
                {feed1 && feed2 && (
                    <div style={{ marginTop: '40px' }}>
                        <div style={{ textAlign: "center", fontSize: "18px", color: "#182451", paddingBottom: "30px" }}>
                            Metric Comparison (Normalized Percentile Scores)
                        </div>
                        <ResponsiveContainer width="100%" height={420}>
                            <BarChart
                                data={percentageMetrics.map(metric => {
                                    const allMetricValues = allData.map(feed => feed[metric]).filter(val => val !== undefined);
                                    const val1 = (allData.find(f => f.uri === feed1.uri) || {})[metric] ?? 0;
                                    const val2 = (allData.find(f => f.uri === feed2.uri) || {})[metric] ?? 0;

                                    return {
                                        name: metric.replaceAll("_", " "),
                                        metricKey: metric,
                                        feed1: val1,
                                        feed2: val2,
                                        feed1Color: getColor(feed1.uri, metric, allMetricValues),
                                        feed2Color: getColor(feed2.uri, metric, allMetricValues)
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
                            >
                                <XAxis dataKey="name">
                                    <Label value="Feed Metrics" 
                                        position="bottom" 
                                        offset={20} 
                                        style={{ textAnchor: "middle", fill: "#182451", fontSize: "16px" }}
                                    />
                                </XAxis>
                                <YAxis
                                    domain={[0, 1]}
                                    tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`}
                                    >
                                    <Label
                                        value="Percentile Score"
                                        angle={-90}
                                        position="insideLeft"
                                        style={{ textAnchor: "middle", fill: "#182451", fontSize: "16px" }}
                                        offset={-10}
                                    />
                                </YAxis>
                                <Tooltip content={<CustomTooltip />} />

                                { }
                                <Bar dataKey="feed1" isAnimationActive={false}>
                                    {
                                        percentageMetrics.map((metric, index) => {
                                            const allMetricValues = allData.map(feed => feed[metric]).filter(val => val !== undefined);
                                            return (
                                                <Cell key={`cell-feed1-${metric}`} fill={getColor(feed1.uri, metric, allMetricValues)} />
                                            );
                                        })
                                    }
                                    <LabelList dataKey="feed1" content={<CustomBarLabel label="Feed 1" />} />
                                </Bar>
                                <Bar dataKey="feed2" isAnimationActive={false}>
                                    {
                                        percentageMetrics.map((metric, index) => {
                                            const allMetricValues = allData.map(feed => feed[metric]).filter(val => val !== undefined);
                                            return (
                                                <Cell key={`cell-feed2-${metric}`} fill={getColor(feed2.uri, metric, allMetricValues)} />
                                            );
                                        })
                                    }
                                    <LabelList dataKey="feed2" content={<CustomBarLabel label="Feed 2" />} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comparison;
