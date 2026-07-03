"use client";
import React, { useState } from 'react';

export default function PayrollPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockPayroll = [
    { id: "PAY-001", employee: "Dr. Alan Grant", role: "Science Teacher", amount: "$4,500", status: "Processed", date: "2024-09-30" },
    { id: "PAY-002", employee: "Ellie Sattler", role: "Biology Teacher", amount: "$4,200", status: "Pending", date: "2024-10-30" },
    { id: "PAY-003", employee: "Ian Malcolm", role: "Math Teacher", amount: "$4,600", status: "Pending", date: "2024-10-30" },
  ];

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 className="text-h1 font-h1 text-primary mb-2">HR & Payroll</h1>
          <p className="text-body-md text-on-surface-variant">Manage employee salaries, bonuses, and tax deductions</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">payments</span>
          Generate Payslip
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Slip ID</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Employee</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Net Salary</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Payout Date</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockPayroll.map((pay) => (
              <tr key={pay.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                <td className="p-4 font-bold text-primary-fixed-variant">{pay.id}</td>
                <td className="p-4">
                  <div className="font-bold text-on-surface">{pay.employee}</div>
                  <div className="text-body-sm text-on-surface-variant">{pay.role}</div>
                </td>
                <td className="p-4 font-bold text-on-surface">{pay.amount}</td>
                <td className="p-4 text-on-surface-variant">{new Date(pay.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                    pay.status === 'Processed' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 'bg-tertiary-container/20 text-on-tertiary-container border-tertiary-container'
                  }`}>
                    {pay.status}
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
              <h2 className="text-h3 font-h3 text-on-surface">Generate Payslip</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6">
              <p className="text-body-md text-on-surface-variant mb-4">Select an employee to generate and process a new payslip for this month.</p>
              <select className="w-full bg-surface-container border border-outline-variant rounded p-3 mb-4">
                <option>John Hammond (Principal)</option>
                <option>Ray Arnold (IT)</option>
              </select>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded">Cancel</button>
                <button className="px-4 py-2 bg-primary text-on-primary rounded">Generate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
