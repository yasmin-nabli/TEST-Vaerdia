import React from "react";

const Filter = ({ selectedBody, setSelectedBody, orbitalBodies }) => (
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
);

export default Filter;
