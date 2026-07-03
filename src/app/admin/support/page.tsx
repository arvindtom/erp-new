"use client";
import React, { useEffect, useState } from 'react';

type Ticket = {
  id: string;
  subject: string;
  user: string;
  priority: string;
  status: string;
};

export default function SupportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    user: '',
    priority: 'Medium'
  });

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/support');
      if (res.ok) setTickets(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ subject: '', user: '', priority: 'Medium' });
        fetchTickets();
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
          <h1 className="text-h1 font-h1 text-primary mb-2">Support & Contacts</h1>
          <p className="text-body-md text-on-surface-variant">Manage parent/staff helpdesk tickets and inquiries</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">add_comment</span>
          New Ticket
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Ticket ID</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Subject</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">User</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Priority</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">Loading tickets...</td></tr>
            ) : tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                  <td className="p-4 font-bold text-primary-fixed-variant">{ticket.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-bold text-on-surface">{ticket.subject}</td>
                  <td className="p-4 text-on-surface-variant">{ticket.user}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                      ticket.priority === 'High' ? 'text-error border-error-container bg-error-container/20' : 
                      ticket.priority === 'Medium' ? 'text-tertiary border-tertiary-container bg-tertiary-container/20' : 
                      'text-on-surface-variant border-outline-variant'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                      ticket.status === 'Resolved' ? 'bg-secondary-container text-on-secondary-container' : 
                      'bg-surface-container text-on-surface-variant'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">No support tickets found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full shadow-lg overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-on-surface">New Ticket</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Subject</label>
                <input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">User (Parent/Staff)</label>
                <input required value={formData.user} onChange={e => setFormData({...formData, user: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Priority</label>
                <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded p-3">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded">Cancel</button>
                <button disabled={submitting} type="submit" className="px-4 py-2 bg-primary text-on-primary rounded disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
