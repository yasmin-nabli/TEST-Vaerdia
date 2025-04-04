import React, { useEffect, useState } from "react";
import { serviceAsteroids } from "../api/fetchApi";
import BarChart from "../components/BarChart";
import Table from "../components/Table";
import Switch from "../components/Switch";
import Filter from "../components/Filter";

const AsteroidChart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [orbitalBodies, setOrbitalBodies] = useState([]);
  const [selectedBody, setSelectedBody] = useState("");
  const [view, setView] = useState("chart");

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
      setFilteredData(data.filter((a) => a.orbitalBody === selectedBody));
    } else {
      setFilteredData(data);
    }
  }, [selectedBody, data]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Asteroid Size Comparison
      </h2>

      <Switch view={view} setView={setView} />
      <Filter
        selectedBody={selectedBody}
        setSelectedBody={setSelectedBody}
        orbitalBodies={orbitalBodies}
      />

      {view === "chart" ? (
        <BarChart data={filteredData} />
      ) : (
        <Table data={filteredData} />
      )}
    </div>
  );
};

export default AsteroidChart;
