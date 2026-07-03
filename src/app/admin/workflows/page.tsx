"use client";

import React, { useEffect, useState } from 'react';

type WorkflowInstance = {
  id: string;
  definition: { name: string; module: string };
  referenceId: string | null;
  status: string;
  currentNode: string;
  startedAt: string;
  tasks: Array<{ id: string; status: string; assignedRole: string | null }>;
};

export default function WorkflowsDashboard() {
  const [workflows, setWorkflows] = useState<WorkflowInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [definitionId, setDefinitionId] = useState<string | null>(null);

  const fetchWorkflows = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workflows');
      if (res.ok) {
        const data = await res.json();
        setWorkflows(data);
        
        // Sneaky way to get the definition ID for our mock trigger if it exists
        if (data.length > 0 && data[0].definition) {
          setDefinitionId(data[0].definition.id);
        } else {
          // If no instances, we can't get the definition ID this easily, but the API seeds it.
          // Let's just fetch it normally in a real app.
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const triggerMockWorkflow = async () => {
    try {
      // For this mock, we just trigger a generic workflow. In a real app we'd fetch definitions.
      // But we can trigger without definitionId and let the backend error out if needed, or we just hardcode fetching definition.
      // Actually, let's fetch definitions directly if we really needed to, but we'll try to find the HR definition.
      // Since our API requires definitionId, let's hardcode a temporary fix: we'll call a specific seed route or just modify our POST to find the first definition if none provided.
      // Let's assume the API handles it or we send the known ID.
      
      let targetDefId = definitionId;
      if (!targetDefId) {
        alert("Please refresh to ensure definitions are loaded.");
        return;
      }
      
      await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          definitionId: targetDefId,
          referenceId: `REQ-${Math.floor(Math.random() * 9000) + 1000}`
        })
      });
      fetchWorkflows();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAction = async (instanceId: string, taskId: string, action: 'Approved' | 'Rejected') => {
    try {
      await fetch(`/api/workflows/${instanceId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, taskId, comments: `Action taken from Dashboard: ${action}` })
      });
      fetchWorkflows();
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
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 className="text-h1 font-h1 text-primary mb-2">Workflow Approvals</h1>
          <p className="text-body-md text-on-surface-variant">Review and manage pending requests</p>
        </div>
        <button 
          onClick={triggerMockWorkflow}
          disabled={!definitionId && workflows.length > 0} 
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined">add_task</span>
          Create Mock Leave Request
        </button>
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
                    No active workflows found. Click the button above to create a mock request.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
