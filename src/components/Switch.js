import React from "react";

const Switch = ({ view, setView }) => (
  <div className="flex justify-center gap-4 mb-4">
    <button
      className={`px-4 py-2 rounded ${
        view === "chart" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
      onClick={() => setView("chart")}
    >
      Chart View
    </button>
    <button
      className={`px-4 py-2 rounded ${
        view === "table" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
      onClick={() => setView("table")}
    >
      Table View
    </button>
  </div>
);

export default Switch;
