"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type WorkflowDefinition = {
  id: string;
  name: string;
  module: string;
  isActive: boolean;
  createdAt: string;
};

export default function WorkflowSetupPage() {
  const [definitions, setDefinitions] = useState<WorkflowDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', module: 'HR' });
  const [submitting, setSubmitting] = useState(false);

  const fetchDefinitions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workflows/definitions');
      if (res.ok) {
        setDefinitions(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDefinitions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/workflows/definitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', module: 'HR' });
        fetchDefinitions();
      } else {
        alert("Failed to create definition. Are you testing on Vercel?");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving. If on Vercel, SQLite writes are not allowed.");
    }
    setSubmitting(false);
  };

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <div className="flex items-center gap-2 text-body-sm text-on-surface-variant mb-2">
            <Link href="/admin/workflows" className="hover:text-primary transition-colors">Workflows</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface">Setup</span>
          </div>
          <h1 className="text-h1 font-h1 text-primary mb-2">Workflow Setup</h1>
          <p className="text-body-md text-on-surface-variant">Configure and manage automated processes</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          Create New Workflow
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Name</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Module</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-right">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">Loading setups...</td></tr>
            ) : definitions.length > 0 ? (
              definitions.map((def) => (
                <tr key={def.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="p-4 font-bold text-on-surface">{def.name}</td>
                  <td className="p-4"><span className="text-body-sm bg-surface-container px-2 py-1 rounded">{def.module}</span></td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${def.isActive ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                      {def.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right text-body-sm text-on-surface-variant">
                    {new Date(def.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">No workflows configured.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-on-surface">Create Workflow</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Workflow Name</label>
                  <input 
                    required 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Student Transfer Certificate"
                    className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Module</label>
                  <select 
                    value={formData.module}
                    onChange={(e) => setFormData({...formData, module: e.target.value})}
                    className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="HR">HR & Faculty</option>
                    <option value="Academics">Academics</option>
                    <option value="Students">Student Management</option>
                    <option value="Finance">Finance & Fees</option>
                    <option value="Inventory">Inventory & Purchase</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded text-label-md font-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-4 py-2 bg-primary text-on-primary rounded text-label-md font-label-md hover:bg-primary-container transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Create Workflow'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
