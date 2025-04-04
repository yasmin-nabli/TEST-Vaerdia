import React from "react";

const Table = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Min Diameter (m)</th>
          <th className="p-2 border">Max Diameter (m)</th>
          <th className="p-2 border">Orbital Body</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="text-center">
            <td className="p-2 border">{item.name}</td>
            <td className="p-2 border">{item.minDiameter.toFixed(2)}</td>
            <td className="p-2 border">{item.maxDiameter.toFixed(2)}</td>
            <td className="p-2 border">{item.orbitalBody}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
