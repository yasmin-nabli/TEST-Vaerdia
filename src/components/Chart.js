import React, { useEffect, useState } from "react";
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
import { serviceAsteroids } from "../api/fetchApi";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const asteroids = await serviceAsteroids();
      if (asteroids.length) {
        const formattedData = asteroids
          .map((asteroid) => ({
            name: asteroid.name,
            minDiameter:
              asteroid.estimated_diameter.meters.estimated_diameter_min,
            maxDiameter:
              asteroid.estimated_diameter.meters.estimated_diameter_max,
          }))
          .sort(
            (a, b) =>
              (b.minDiameter + b.maxDiameter) / 2 -
              (a.minDiameter + a.maxDiameter) / 2
          );
        setData(formattedData);
      }
    };
    getData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        non-Stacked Bar Chart
      </h2>

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
    </div>
  );
};

export default Chart;
