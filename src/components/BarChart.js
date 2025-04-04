import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const GraphBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={500}>
    <BarChart data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        type="number"
        label={{
          value: "Diameter (m)",
          position: "insideBottom",
          dy: 15,
          fontSize: 14,
        }}
      />
      <YAxis
        dataKey="name"
        type="category"
        width={150}
        label={{
          value: "NEO Name",
          angle: -90,
          position: "insideLeft",
          fontSize: 14,
        }}
      />
      <Tooltip />
      <Legend verticalAlign="top" height={36} />
      <Bar dataKey="minDiameter" fill="#8884d8" name="Min Diameter (m)" />
      <Bar dataKey="maxDiameter" fill="#82ca9d" name="Max Diameter (m)" />
    </BarChart>
  </ResponsiveContainer>
);

export default GraphBarChart;
