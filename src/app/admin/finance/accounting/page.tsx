"use client";
import React, { useState } from 'react';

export default function AccountingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockTransactions = [
    { id: "TXN-8091", type: "Income", category: "Tuition", amount: "+$45,000", date: "2024-10-14", account: "Main Bank" },
    { id: "TXN-8092", type: "Expense", category: "Maintenance", amount: "-$1,200", date: "2024-10-13", account: "Operating Fund" },
    { id: "TXN-8093", type: "Expense", category: "Utilities", amount: "-$850", date: "2024-10-12", account: "Operating Fund" },
    { id: "TXN-8094", type: "Income", category: "Donation", amount: "+$5,000", date: "2024-10-10", account: "Endowment" },
  ];

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 className="text-h1 font-h1 text-primary mb-2">General Accounting</h1>
          <p className="text-body-md text-on-surface-variant">Manage ledgers, income, expenses, and bank reconciliation</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">add_card</span>
          Add Transaction
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">TXN ID</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Date</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Category</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Account</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((txn) => (
              <tr key={txn.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors">
                <td className="p-4 font-bold text-on-surface-variant">{txn.id}</td>
                <td className="p-4 text-on-surface">{new Date(txn.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                    txn.type === 'Income' ? 'bg-secondary-container/30 text-on-secondary-container' : 'bg-error-container/30 text-error'
                  }`}>
                    {txn.category}
                  </span>
                </td>
                <td className="p-4 text-on-surface-variant">{txn.account}</td>
                <td className={`p-4 text-right font-bold ${txn.type === 'Income' ? 'text-secondary' : 'text-error'}`}>
                  {txn.amount}
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
              <h2 className="text-h3 font-h3 text-on-surface">New Transaction</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="p-6 space-y-4">
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 text-on-surface"><input type="radio" name="type" defaultChecked /> Income</label>
                <label className="flex items-center gap-2 text-on-surface"><input type="radio" name="type" /> Expense</label>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Category</label>
                <input type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" placeholder="e.g. Office Supplies" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Amount</label>
                <input type="number" className="w-full bg-surface-container border border-outline-variant rounded p-3" placeholder="$0.00" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Date</label>
                <input type="date" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div className="mt-8 flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded hover:bg-surface-container">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded">Save Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
