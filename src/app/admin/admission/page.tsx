"use client";
import React, { useState } from 'react';

export default function AdmissionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  const mockApplications = [
    { id: "APP-2401", student: "Emma Thompson", grade: "Grade 5", date: "2024-10-12", status: "Pending", phone: "+1 234 567 8900" },
    { id: "APP-2402", student: "Liam Patel", grade: "Grade 10", date: "2024-10-11", status: "Approved", phone: "+1 234 567 8901" },
    { id: "APP-2403", student: "Sophia Lee", grade: "Grade 1", date: "2024-10-10", status: "Rejected", phone: "+1 234 567 8902" },
  ];

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 className="text-h1 font-h1 text-primary mb-2">Admissions</h1>
          <p className="text-body-md text-on-surface-variant">Manage new student applications and enrollments</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">person_add</span>
          New Admission
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Total Applications</div>
          <div className="text-h2 font-h2 text-primary">1,284</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Pending Review</div>
          <div className="text-h2 font-h2 text-tertiary">42</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Admitted This Year</div>
          <div className="text-h2 font-h2 text-secondary">315</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <div className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-2">Acceptance Rate</div>
          <div className="text-h2 font-h2 text-primary">24%</div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <div className="border-b border-outline-variant flex px-4 gap-6">
          <button onClick={() => setActiveTab('pending')} className={`py-4 font-label-md border-b-2 transition-colors ${activeTab === 'pending' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>Pending (42)</button>
          <button onClick={() => setActiveTab('approved')} className={`py-4 font-label-md border-b-2 transition-colors ${activeTab === 'approved' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>Approved</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">App ID</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Student Name</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Grade Applied</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Date</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockApplications.map((app) => (
              <tr key={app.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors">
                <td className="p-4 font-bold text-primary-fixed-variant">{app.id}</td>
                <td className="p-4 text-on-surface">
                  <div className="font-bold">{app.student}</div>
                  <div className="text-body-sm text-on-surface-variant">{app.phone}</div>
                </td>
                <td className="p-4 text-on-surface-variant">{app.grade}</td>
                <td className="p-4 text-on-surface-variant">{new Date(app.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                    app.status === 'Approved' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 
                    app.status === 'Rejected' ? 'bg-error-container/20 text-error border-error-container' : 
                    'bg-tertiary-container/20 text-on-tertiary-container border-tertiary-container'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-primary hover:text-primary-fixed-variant transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-2xl w-full shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-on-surface">New Admission Entry</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h3 className="text-label-lg font-bold text-primary mb-3 border-b border-outline-variant pb-2">Student Information</h3>
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">First Name</label>
                  <input type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" placeholder="Enter first name" />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Last Name</label>
                  <input type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" placeholder="Enter last name" />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Date of Birth</label>
                  <input type="date" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Grade Applying For</label>
                  <select className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md">
                    <option>Kindergarten</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                  </select>
                </div>
                
                <div className="col-span-2 mt-4">
                  <h3 className="text-label-lg font-bold text-primary mb-3 border-b border-outline-variant pb-2">Parent/Guardian Information</h3>
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Guardian Name</label>
                  <input type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Contact Phone</label>
                  <input type="tel" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-label-md font-label-md text-on-surface-variant hover:bg-surface-container transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded text-label-md font-label-md hover:bg-primary-container transition-colors">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
