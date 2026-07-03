"use client";
import React, { useState } from 'react';

export default function LibraryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockBooks = [
    { id: "LIB-901", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Literature", status: "Available" },
    { id: "LIB-902", title: "Introduction to Calculus", author: "James Stewart", category: "Mathematics", status: "Issued" },
    { id: "LIB-903", title: "World History", author: "Prentice Hall", category: "History", status: "Issued" },
  ];

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
            {mockBooks.map((book) => (
              <tr key={book.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50">
                <td className="p-4 font-bold text-primary-fixed-variant">{book.id}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
