import React, { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";

const PoliticalCompass = ({ feeds }) => {
  const [xAxis, setXAxis] = useState("toxicity_score"); // Default X-axis
  const [yAxis, setYAxis] = useState("positivity_score"); // Default Y-axis

  const dimensions = ["likes", "posts", "toxicity_score", "positivity_score", "commercial_link_score", "poster_diversity_score"];

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">Feed Political Compass</h2>

      {/* Dropdowns for selecting X and Y axes */}
      <div className="flex gap-4 mb-4">
        <label>
          X-Axis:{" "}
          <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="border p-2 rounded">
            {dimensions.map((dim) => (
              <option key={dim} value={dim}>{dim}</option>
            ))}
          </select>
        </label>

        <label>
          Y-Axis:{" "}
          <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="border p-2 rounded">
            {dimensions.map((dim) => (
              <option key={dim} value={dim}>{dim}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Scatter Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-Axis */}
          <XAxis type="number" dataKey={xAxis} name={xAxis} domain={[-1, 1]} tick={{ fontSize: 12 }}>
            <Label value={xAxis} offset={-10} position="insideBottom" />
          </XAxis>

          {/* Y-Axis */}
          <YAxis type="number" dataKey={yAxis} name={yAxis} domain={[-1, 1]} tick={{ fontSize: 12 }}>
            <Label value={yAxis} angle={-90} position="insideLeft" />
          </YAxis>

          {/* Tooltip */}
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />

          {/* Scatter Data */}
          <Scatter name="Feeds" data={feeds} fill="#8884d8" />

          {/* Center Lines for Quadrants */}
          <CartesianGrid vertical={false} stroke="black" strokeWidth={1} />
          <CartesianGrid horizontal={false} stroke="black" strokeWidth={1} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PoliticalCompass;
