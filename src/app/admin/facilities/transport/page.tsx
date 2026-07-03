"use client";
import React, { useEffect, useState } from 'react';

type Route = {
  id: string;
  name: string;
  vehicle: string;
  driver: string;
  stops: number;
  status: string;
};

export default function TransportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    driver: '',
    stops: ''
  });

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/facilities/transport');
      if (res.ok) setRoutes(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/facilities/transport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', vehicle: '', driver: '', stops: '' });
        fetchRoutes();
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
          <h1 className="text-h1 font-h1 text-primary mb-2">Transport Fleet</h1>
          <p className="text-body-md text-on-surface-variant">Manage routes, vehicles, and student assignments</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">add_road</span>
          Add Route
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Route Code</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Route Name</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Vehicle / Driver</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Stops</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">Loading routes...</td></tr>
            ) : routes.length > 0 ? (
              routes.map((route) => (
                <tr key={route.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                  <td className="p-4 font-bold text-primary-fixed-variant">{route.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-bold text-on-surface">{route.name}</td>
                  <td className="p-4">
                    <div className="font-bold text-on-surface">{route.vehicle}</div>
                    <div className="text-body-sm text-on-surface-variant">{route.driver}</div>
                  </td>
                  <td className="p-4 text-on-surface font-bold">{route.stops}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                      route.status === 'Active' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 'bg-error-container/20 text-error border-error-container'
                    }`}>
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">No routes configured.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full shadow-lg overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-on-surface">Add Route</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Route Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Vehicle (e.g., Bus A)</label>
                <input required value={formData.vehicle} onChange={e => setFormData({...formData, vehicle: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Driver Name</label>
                <input required value={formData.driver} onChange={e => setFormData({...formData, driver: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Number of Stops</label>
                <input required value={formData.stops} onChange={e => setFormData({...formData, stops: e.target.value})} type="number" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded">Cancel</button>
                <button disabled={submitting} type="submit" className="px-4 py-2 bg-primary text-on-primary rounded disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Add Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
