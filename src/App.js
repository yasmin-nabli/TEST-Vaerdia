import React from "react";
import Chart from "./components/Chart";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Near-Earth-Objects travelling Visualization
      </h1>
      <Chart />
    </div>
  );
};

export default App;
