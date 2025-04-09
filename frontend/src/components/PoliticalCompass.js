import React, { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Line } from "recharts";

const PoliticalCompass = ({ feeds, highlightedFeedIds = [] }) => {
    const dimensions = ["likes", "posts", "toxicity_score", "positivity_score", "subjectivity_score", "poster_diversity_score", "reverse_chrono_score"];
    const [xAxis, setXAxis] = useState(dimensions[2]);
    const [yAxis, setYAxis] = useState(dimensions[3]);

    const formatLabel = (label) => {
        if (typeof label !== 'string') return label;
        return label.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };
  
    const formatPercentage = (value) => {
        return `${(value * 100).toFixed(0)}%`;
    };

    const highlightedFeeds = feeds.filter(feed => highlightedFeedIds.includes(feed.uri));
    const regularFeeds = feeds.filter(feed => !highlightedFeedIds.includes(feed.uri));

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || payload.length === 0) return null;
    
        const data = payload[0].payload;
    
        return (
            <div style={{ background: "#fff", border: "1px solid #ccc", padding: "8px", borderRadius: "6px", color: "#182451" }}>
                <p><strong>{formatLabel("feed_name")}</strong>: {data.display_name}</p>
                <p>{formatLabel(xAxis)}: {formatPercentage(data[xAxis])}</p>
                <p>{formatLabel(yAxis)}: {formatPercentage(data[yAxis])}</p>
            </div>
        );
    };

    return (
        <div className="p-6 max-w-4xl mx-auto border rounded-lg bg-white shadow-lg">
            <div style={{ textAlign: "center", fontSize: "18px", color: "#182451", paddingBottom: "20px", paddingTop: "20px" }}>
                Compare All Feeds
            </div>
            <div className="drop-down-container">
                <div className="drop-down-1">
                    <span>X-Axis:</span>
                    <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="dropdown">
                        {dimensions.map((dim) => (
                            <option key={dim} value={dim}>{formatLabel(dim)}</option>
                        ))}
                    </select>
                </div>

                <div className="drop-down-2">
                    <span>Y-Axis:</span>
                    <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="dropdown">
                        {dimensions.map((dim) => (
                            <option key={dim} value={dim}>{formatLabel(dim)}</option>
                        ))}
                    </select>
                </div>
            </div>

            <ResponsiveContainer className="results-scatter-plot" height={500}>
                <ScatterChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#A0AEC0" />
                    <XAxis 
                        type="number" 
                        dataKey={xAxis} 
                        name={xAxis} 
                        domain={[0, 1]} 
                        tick={{ fontSize: 14, fill: "#182451" }}
                        tickFormatter={formatPercentage}
                    >
                    <Label value={formatLabel(xAxis)} offset={-10} position="insideBottom" fontSize={16} fill="#182451" />
                    </XAxis>

                    <YAxis 
                        type="number" 
                        dataKey={yAxis} 
                        name={yAxis} 
                        domain={[0, 1]} 
                        tick={{ fontSize: 14, fill: "#182451" }}
                        tickFormatter={formatPercentage}
                    >
                        <Label value={formatLabel(yAxis)} angle={-90} position="insideLeft" fontSize={16} fill="#182451" />
                    </YAxis>

                    <Tooltip content={(props) => <CustomTooltip {...props} xAxis={xAxis} yAxis={yAxis} />} />
                    <Scatter name="Feeds" data={regularFeeds} fill="#182451" shape="circle" />
                    <Scatter name="Highlighted Feeds" data={highlightedFeeds} fill="#EF4444" shape="circle" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PoliticalCompass;
