"use client";
import React, { useEffect, useState } from 'react';

type Payslip = {
  id: string;
  employeeName: string;
  role: string;
  amount: number;
  status: string;
  date: string;
};

export default function PayrollPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    employeeName: '',
    role: 'Teacher',
    amount: ''
  });

  const fetchPayslips = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hr/payroll');
      if (res.ok) setPayslips(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayslips();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/hr/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ employeeName: '', role: 'Teacher', amount: '' });
        fetchPayslips();
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
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">Loading payslips...</td></tr>
            ) : payslips.length > 0 ? (
              payslips.map((pay) => (
                <tr key={pay.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                  <td className="p-4 font-bold text-primary-fixed-variant">{pay.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4">
                    <div className="font-bold text-on-surface">{pay.employeeName}</div>
                    <div className="text-body-sm text-on-surface-variant">{pay.role}</div>
                  </td>
                  <td className="p-4 font-bold text-on-surface">${pay.amount.toLocaleString()}</td>
                  <td className="p-4 text-on-surface-variant">{new Date(pay.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                      pay.status === 'Processed' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 'bg-tertiary-container/20 text-on-tertiary-container border-tertiary-container'
                    }`}>
                      {pay.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">No payslips found.</td></tr>
            )}
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
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Employee Name</label>
                  <input required value={formData.employeeName} onChange={e => setFormData({...formData, employeeName: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Role</label>
                  <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Net Salary Amount ($)</label>
                  <input required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} type="number" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded">Cancel</button>
                <button disabled={submitting} type="submit" className="px-4 py-2 bg-primary text-on-primary rounded disabled:opacity-50">
                  {submitting ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
