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
  const [filteredData, setFilteredData] = useState([]);
  const [orbitalBodies, setOrbitalBodies] = useState([]);
  const [selectedBody, setSelectedBody] = useState("");

  useEffect(() => {
    const getData = async () => {
      const asteroids = await serviceAsteroids();
      if (asteroids.length) {
        const formattedData = asteroids.map((asteroid) => ({
          name: asteroid.name,
          minDiameter:
            asteroid.estimated_diameter.meters.estimated_diameter_min,
          maxDiameter:
            asteroid.estimated_diameter.meters.estimated_diameter_max,
          orbitalBody:
            asteroid.close_approach_data?.[0]?.orbiting_body || "Unknown",
        }));

        const uniqueBodies = [
          ...new Set(formattedData.map((a) => a.orbitalBody)),
        ].sort();

        const sortedData = formattedData.sort(
          (a, b) =>
            (b.minDiameter + b.maxDiameter) / 2 -
            (a.minDiameter + a.maxDiameter) / 2
        );

        setData(sortedData);
        setFilteredData(sortedData);
        setOrbitalBodies(uniqueBodies);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (selectedBody) {
      const filtered = data.filter((a) => a.orbitalBody === selectedBody);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedBody, data]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Asteroid Size Comparison
      </h2>

      <div className="flex justify-center mb-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedBody}
          onChange={(e) => setSelectedBody(e.target.value)}
        >
          <option value="">All Orbital Bodies</option>
          {orbitalBodies.map((body) => (
            <option key={body} value={body}>
              {body}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={filteredData} layout="vertical">
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
