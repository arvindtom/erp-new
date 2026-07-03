"use client";
import React, { useState } from 'react';

export default function SupportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockTickets = [
    { id: "TKT-101", subject: "Parent Portal Access Issue", user: "Mrs. Johnson", priority: "High", status: "Open" },
    { id: "TKT-102", subject: "Fee Receipt Not Generated", user: "Mr. Smith", priority: "Medium", status: "In Progress" },
    { id: "TKT-103", subject: "Request for Transport Change", user: "Mr. Davis", priority: "Low", status: "Resolved" },
  ];

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
            {mockTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                <td className="p-4 font-bold text-primary-fixed-variant">{ticket.id}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
