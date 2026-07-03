"use client";
import React, { useState } from 'react';

export default function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockInventory = [
    { id: "INV-001", item: "Projector X1", category: "Electronics", qty: 12, location: "Main Store", status: "In Stock" },
    { id: "INV-002", item: "Printer Ink", category: "Stationery", qty: 2, location: "Admin Block", status: "Low Stock" },
    { id: "INV-003", item: "Science Beakers", category: "Lab Eq.", qty: 50, location: "Science Lab", status: "In Stock" },
  ];

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 className="text-h1 font-h1 text-primary mb-2">Inventory Management</h1>
          <p className="text-body-md text-on-surface-variant">Track school assets, stock levels, and supply orders</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">add_box</span>
          Add Item
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Item ID</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Asset Name</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Category</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Quantity</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockInventory.map((item) => (
              <tr key={item.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                <td className="p-4 font-bold text-primary-fixed-variant">{item.id}</td>
                <td className="p-4 font-bold text-on-surface">{item.item}</td>
                <td className="p-4 text-on-surface-variant">{item.category}</td>
                <td className="p-4 text-on-surface font-bold">{item.qty}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                    item.status === 'In Stock' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 'bg-error-container/20 text-error border-error-container'
                  }`}>
                    {item.status}
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
