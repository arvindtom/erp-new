"use client";
import React, { useEffect, useState } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
};

export default function LibraryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: ''
  });

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/academics/library');
      if (res.ok) setBooks(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/academics/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', author: '', category: '' });
        fetchBooks();
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
          <h1 className="text-h1 font-h1 text-primary mb-2">Library Catalog</h1>
          <p className="text-body-md text-on-surface-variant">Manage book inventory, issuing, and returns</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">library_add</span>
          Add Book
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Book ID</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Title</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Author</th>
              <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">Loading catalog...</td></tr>
            ) : books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                  <td className="p-4 font-bold text-primary-fixed-variant">{book.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-bold text-on-surface">{book.title}</td>
                  <td className="p-4 text-on-surface-variant">{book.author}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${
                      book.status === 'Available' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container' : 'bg-tertiary-container/20 text-on-tertiary-container border-tertiary-container'
                    }`}>
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">No books in catalog.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full shadow-lg overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-on-surface">Add Book</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Title</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Author</label>
                <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-2">Category</label>
                <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3" />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded">Cancel</button>
                <button disabled={submitting} type="submit" className="px-4 py-2 bg-primary text-on-primary rounded disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
