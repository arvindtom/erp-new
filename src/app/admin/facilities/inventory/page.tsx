"use client";
import React, { useEffect, useState } from 'react';

type Asset = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  status: string;
};

export default function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventory, setInventory] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    quantity: '',
    location: 'Main Store'
  });

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/facilities/inventory');
      if (res.ok) setInventory(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/facilities/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', category: 'Electronics', quantity: '', location: 'Main Store' });
        fetchInventory();
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
          <h1 className="text-h1 font-h1 text-primary mb-2">Inventory Management</h1>
          <p className="text-body-md text-on-surface-variant">Track school assets, stock levels, and supply orders</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">add_box</span>
          Add Item
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Item ID</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Asset Name</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Category & Location</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Quantity</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">Loading inventory...</td></tr>
            ) : inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                  <td className="p-4 font-bold text-primary-fixed-variant">{item.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-bold text-on-surface">{item.name}</td>
                  <td className="p-4 text-on-surface-variant">{item.category} - {item.location}</td>
                  <td className="p-4 text-on-surface font-bold">{item.quantity}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                      item.status === 'In Stock' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 'bg-error-container/20 text-error border-error-container'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">No items in inventory.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full shadow-lg overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-on-surface">Add Asset</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Item Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Category</label>
                <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Location</label>
                <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Quantity</label>
                <input required value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} type="number" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded">Cancel</button>
                <button disabled={submitting} type="submit" className="px-4 py-2 bg-primary text-on-primary rounded disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
