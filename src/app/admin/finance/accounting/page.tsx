"use client";
import React, { useEffect, useState } from 'react';

type Transaction = {
  id: string;
  type: string;
  category: string;
  amount: number;
  account: string;
  date: string;
  createdAt: string;
};

export default function AccountingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: 'Income',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/finance/accounting');
      if (res.ok) setTransactions(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/finance/accounting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ type: 'Income', category: '', amount: '', date: new Date().toISOString().split('T')[0] });
        fetchTransactions();
      } else {
        alert("Failed to submit. SQLite is read-only on Vercel.");
      }
    } catch (e) {
      alert("Error submitting.");
    }
    setSubmitting(false);
  };

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
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">Loading ledgers...</td></tr>
            ) : transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="p-4 font-bold text-on-surface-variant">{txn.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-on-surface">{new Date(txn.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                      txn.type === 'Income' ? 'bg-secondary-container/30 text-on-secondary-container' : 'bg-error-container/30 text-error'
                    }`}>
                      {txn.category}
                    </span>
                  </td>
                  <td className={`p-4 text-right font-bold ${txn.type === 'Income' ? 'text-secondary' : 'text-error'}`}>
                    {txn.type === 'Income' ? '+' : '-'}${txn.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">No transactions found.</td></tr>
            )}
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
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 text-on-surface">
                  <input type="radio" name="type" checked={formData.type === 'Income'} onChange={() => setFormData({...formData, type: 'Income'})} /> Income
                </label>
                <label className="flex items-center gap-2 text-on-surface">
                  <input type="radio" name="type" checked={formData.type === 'Expense'} onChange={() => setFormData({...formData, type: 'Expense'})} /> Expense
                </label>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Category</label>
                <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" placeholder="e.g. Office Supplies" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Amount</label>
                <input required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} type="number" step="0.01" className="w-full bg-surface-container border border-outline-variant rounded p-3" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Date</label>
                <input required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} type="date" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div className="mt-8 flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded hover:bg-surface-container">Cancel</button>
                <button disabled={submitting} type="submit" className="px-4 py-2 bg-primary text-on-primary rounded disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Save Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
