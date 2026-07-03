"use client";
import React, { useState } from 'react';

export default function TransportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockRoutes = [
    { id: "RT-01", name: "Downtown Express", vehicle: "Bus A (50 seats)", driver: "John Doe", stops: 12, status: "Active" },
    { id: "RT-02", name: "Suburban Loop", vehicle: "Bus B (30 seats)", driver: "Jane Smith", stops: 8, status: "Active" },
    { id: "RT-03", name: "Westside Direct", vehicle: "Van 1 (15 seats)", driver: "Mike Johnson", stops: 4, status: "Maintenance" },
  ];

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 className="text-h1 font-h1 text-primary mb-2">Transport Fleet</h1>
          <p className="text-body-md text-on-surface-variant">Manage routes, vehicles, and student assignments</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">add_road</span>
          Add Route
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Route Code</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Route Name</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Vehicle / Driver</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Stops</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockRoutes.map((route) => (
              <tr key={route.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                <td className="p-4 font-bold text-primary-fixed-variant">{route.id}</td>
                <td className="p-4 font-bold text-on-surface">{route.name}</td>
                <td className="p-4">
                  <div className="font-bold text-on-surface">{route.vehicle}</div>
                  <div className="text-body-sm text-on-surface-variant">{route.driver}</div>
                </td>
                <td className="p-4 text-on-surface font-bold">{route.stops}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                    route.status === 'Active' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 'bg-error-container/20 text-error border-error-container'
                  }`}>
                    {route.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
