"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type WorkflowDefinition = { id: string; name: string; module: string };
type WorkflowInstance = {
  id: string;
  definition: WorkflowDefinition;
  referenceId: string | null;
  status: string;
  currentNode: string;
  startedAt: string;
  tasks: Array<{ id: string; status: string; assignedRole: string | null }>;
};

export default function WorkflowsDashboard() {
  const [workflows, setWorkflows] = useState<WorkflowInstance[]>([]);
  const [definitions, setDefinitions] = useState<WorkflowDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDefId, setSelectedDefId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchWorkflows = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workflows');
      if (res.ok) setWorkflows(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchDefinitions = async () => {
    try {
      const res = await fetch('/api/workflows/definitions');
      if (res.ok) {
        const data = await res.json();
        setDefinitions(data);
        if (data.length > 0) setSelectedDefId(data[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const openModal = () => {
    fetchDefinitions();
    setIsModalOpen(true);
  };

  const submitMockWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDefId) return alert("Please select a workflow definition first.");
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          definitionId: selectedDefId,
          referenceId: `REQ-${Math.floor(Math.random() * 9000) + 1000}`
        })
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchWorkflows();
      } else {
        alert("Failed. If on Vercel, SQLite writes are restricted.");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving.");
    }
    setSubmitting(false);
  };

  const handleAction = async (instanceId: string, taskId: string, action: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch(`/api/workflows/${instanceId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, taskId, comments: `Action taken from Dashboard: ${action}` })
      });
      if (res.ok) fetchWorkflows();
      else alert("Failed to save action. SQLite is read-only on Vercel.");
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-tertiary-container/20 text-on-tertiary-container border-tertiary-container';
      case 'Approved': return 'bg-secondary-container/20 text-on-secondary-container border-secondary-container';
      case 'Rejected': return 'bg-error-container/20 text-error border-error-container';
      default: return 'bg-surface-container border-outline text-on-surface-variant';
    }
  };

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar relative">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 className="text-h1 font-h1 text-primary mb-2">Workflow Approvals</h1>
          <p className="text-body-md text-on-surface-variant">Review and manage pending requests</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/workflows/setup"
            className="border border-outline-variant text-on-surface-variant px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
            Workflow Setup
          </Link>
          <button 
            onClick={openModal}
            className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined">add_task</span>
            Create Request
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant">
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Workflow Reference</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Module & Type</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Current Step</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">Loading workflows...</td>
                </tr>
              ) : workflows.length > 0 ? (
                workflows.map((wf) => {
                  const pendingTask = wf.tasks.find(t => t.status === 'Pending');
                  
                  return (
                    <tr key={wf.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-primary-fixed-variant">{wf.referenceId || wf.id.slice(-6).toUpperCase()}</div>
                        <div className="text-body-sm text-on-surface-variant mt-1">Started: {new Date(wf.startedAt).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-on-surface">{wf.definition?.name || 'Unknown Workflow'}</div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">{wf.definition?.module || 'System'}</div>
                      </td>
                      <td className="p-4 text-body-sm text-on-surface-variant">
                        {wf.currentNode}
                        {pendingTask && <div className="mt-1 text-xs text-primary">Pending on: {pendingTask.assignedRole}</div>}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${getStatusBadge(wf.status)}`}>
                          {wf.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {pendingTask && wf.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleAction(wf.id, pendingTask.id, 'Approved')}
                              className="px-3 py-1.5 bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary text-label-sm font-label-sm rounded transition-colors"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleAction(wf.id, pendingTask.id, 'Rejected')}
                              className="px-3 py-1.5 bg-error-container text-error hover:bg-error hover:text-on-error text-label-sm font-label-sm rounded transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-body-sm text-on-surface-variant">Actioned</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    No active workflows found. Click the button above to create a request.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MOCK REQUEST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-on-surface">Trigger Request</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={submitMockWorkflow} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Select Workflow Type</label>
                  {definitions.length > 0 ? (
                    <select 
                      value={selectedDefId}
                      onChange={(e) => setSelectedDefId(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant rounded p-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      {definitions.map(d => (
                        <option key={d.id} value={d.id}>[{d.module}] {d.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 bg-error-container/20 text-error rounded text-body-sm border border-error-container">
                      No workflows exist yet. Please go to Workflow Setup to create one first.
                    </div>
                  )}
                </div>
                
                <p className="text-body-sm text-on-surface-variant pt-2">
                  * Note: In a full implementation, selecting a type would open the specific form for that request. For this demo, it will instantly generate a mock submission.
                </p>
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
                  disabled={submitting || definitions.length === 0}
                  className="px-4 py-2 bg-primary text-on-primary rounded text-label-md font-label-md hover:bg-primary-container transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Triggering...' : 'Start Workflow'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
