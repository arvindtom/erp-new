"use client";
import React, { useEffect, useState } from 'react';

type Fee = {
  id: string;
  studentName: string;
  grade: string;
  description: string;
  amount: number;
  status: string;
  date: string;
};

export default function FeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    description: 'Tuition Fee',
    amount: ''
  });

  const fetchFees = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/finance/fees');
      if (res.ok) setFees(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/finance/fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ studentName: '', description: 'Tuition Fee', amount: '' });
        fetchFees();
      } else {
        alert("Failed to submit. SQLite is read-only on Vercel.");
      }
    } catch (e) {
      alert("Error submitting.");
    }
    setSubmitting(false);
  };

  const totalCollected = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);

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
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Collected Total</div>
          <div className="text-h2 font-h2 text-on-surface">${totalCollected.toLocaleString()}</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm border-l-4 border-l-error">
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Total Invoices</div>
          <div className="text-h2 font-h2 text-error">{fees.length}</div>
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
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">Loading fees...</td></tr>
            ) : fees.length > 0 ? (
              fees.map((fee) => (
                <tr key={fee.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="p-4 font-bold text-primary-fixed-variant">{fee.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-on-surface font-medium">{fee.studentName} <span className="text-body-sm text-on-surface-variant block">{fee.grade}</span></td>
                  <td className="p-4 text-on-surface-variant">{fee.description}</td>
                  <td className="p-4 text-on-surface font-bold">${fee.amount.toLocaleString()}</td>
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
              ))
            ) : (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">No fee records found.</td></tr>
            )}
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
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Student Name</label>
                <input required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Fee Category</label>
                <select value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md">
                  <option>Tuition Fee</option>
                  <option>Transport Fee</option>
                  <option>Library Fine</option>
                </select>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Amount Received ($)</label>
                <input required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} type="number" step="0.01" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" placeholder="0.00" />
              </div>
              <div className="mt-8 flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-label-md font-label-md text-on-surface-variant hover:bg-surface-container">Cancel</button>
                <button disabled={submitting} type="submit" className="px-4 py-2 bg-primary text-on-primary rounded text-label-md font-label-md hover:bg-primary-container disabled:opacity-50">
                  {submitting ? 'Processing...' : 'Process Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
