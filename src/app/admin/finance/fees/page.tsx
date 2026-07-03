"use client";
import React, { useState } from 'react';

export default function FeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockFees = [
    { id: "FEE-001", student: "Alice Cooper", grade: "Grade 10", description: "Term 1 Tuition", amount: "$1,200", status: "Paid", date: "2024-09-01" },
    { id: "FEE-002", student: "Bobby Tables", grade: "Grade 8", description: "Term 1 Tuition", amount: "$1,200", status: "Overdue", date: "2024-09-15" },
    { id: "FEE-003", student: "Charlie Brown", grade: "Grade 2", description: "Transport Fee", amount: "$300", status: "Pending", date: "2024-10-01" },
  ];

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 className="text-h1 font-h1 text-primary mb-2">Fees Collection</h1>
          <p className="text-body-md text-on-surface-variant">Track student fee payments, invoices, and outstanding balances</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          Record Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm border-l-4 border-l-secondary-fixed">
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Collected This Month</div>
          <div className="text-h2 font-h2 text-on-surface">$124,500</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm border-l-4 border-l-error">
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Total Overdue</div>
          <div className="text-h2 font-h2 text-error">$18,200</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm border-l-4 border-l-tertiary">
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Upcoming Receivables</div>
          <div className="text-h2 font-h2 text-on-surface">$45,000</div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Invoice ID</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Student</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Description</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Amount</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockFees.map((fee) => (
              <tr key={fee.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors">
                <td className="p-4 font-bold text-primary-fixed-variant">{fee.id}</td>
                <td className="p-4 text-on-surface font-medium">{fee.student} <span className="text-body-sm text-on-surface-variant block">{fee.grade}</span></td>
                <td className="p-4 text-on-surface-variant">{fee.description}</td>
                <td className="p-4 text-on-surface font-bold">{fee.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                    fee.status === 'Paid' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 
                    fee.status === 'Overdue' ? 'bg-error-container/20 text-error border-error-container' : 
                    'bg-tertiary-container/20 text-on-tertiary-container border-tertiary-container'
                  }`}>
                    {fee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full shadow-lg overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-on-surface">Record Payment</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Student ID / Name</label>
                <input type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" placeholder="Search student..." />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Fee Category</label>
                <select className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md">
                  <option>Tuition Fee</option>
                  <option>Transport Fee</option>
                  <option>Library Fine</option>
                </select>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Amount Received</label>
                <input type="number" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" placeholder="$0.00" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Payment Method</label>
                <select className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md">
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                </select>
              </div>
              <div className="mt-8 flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-label-md font-label-md text-on-surface-variant hover:bg-surface-container">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded text-label-md font-label-md hover:bg-primary-container">Process Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
