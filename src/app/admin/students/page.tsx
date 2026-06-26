"use client";

import React, { useState } from 'react';
import { mockStudents, Student } from '@/data/mockStudents';

export default function StudentDirectoryPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    grade: 'Grade 9-C',
    guardianContact: '',
    status: 'Active',
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name) return;
    
    const student: Student = {
      id: `STU-2024-${String(Math.floor(Math.random() * 900) + 100)}`,
      name: newStudent.name,
      grade: newStudent.grade as string,
      guardianContact: newStudent.guardianContact || 'N/A',
      status: newStudent.status as any,
    };
    
    setStudents([student, ...students]);
    setIsAddModalOpen(false);
    setNewStudent({ name: '', grade: 'Grade 9-C', guardianContact: '', status: 'Active' });
  };

  // Compute some quick stats
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const attendanceRate = "94%";

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'All' || student.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-secondary-container/20 text-on-secondary-container border-secondary-container';
      case 'Suspended': return 'bg-error-container/20 text-error border-error-container';
      case 'Graduated': return 'bg-surface-container-high text-on-surface-variant border-outline-variant';
      default: return 'bg-surface-container text-on-surface border-outline';
    }
  };

  return (
    <div className="p-gutter h-full overflow-auto custom-scrollbar">
      
      {/* Header & Quick Stats */}
      <div className="mb-stack-lg">
        <h1 className="text-h1 font-h1 text-primary mb-6">Student Directory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-outline-variant">
            <div className="flex justify-between items-start mb-2">
              <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">Total Students</p>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-h2 font-h2 text-primary">{totalStudents}</h2>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-outline-variant">
            <div className="flex justify-between items-start mb-2">
              <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">Active Enrollments</p>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-h2 font-h2 text-primary">{activeStudents}</h2>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-outline-variant">
            <div className="flex justify-between items-start mb-2">
              <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">Avg. Attendance</p>
              <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-h2 font-h2 text-primary">{attendanceRate}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant bg-surface-container-low flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-4 w-full sm:w-auto flex-1 max-w-md">
            <div className="relative w-full focus-within:ring-2 focus-within:ring-primary/50 rounded transition-all">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-sm focus:outline-none" 
                placeholder="Search students by name or ID..." 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select 
              className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-sm focus:outline-none text-on-surface"
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <option value="All">All Grades</option>
              <option value="Grade 9-C">Grade 9-C</option>
              <option value="Grade 10-A">Grade 10-A</option>
              <option value="Grade 10-B">Grade 10-B</option>
              <option value="Grade 11-A">Grade 11-A</option>
              <option value="Grade 11-B">Grade 11-B</option>
              <option value="Grade 12-A">Grade 12-A</option>
              <option value="Alumni">Alumni</option>
            </select>
            
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined">person_add</span>
              <span className="font-label-md">Add Student</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant">
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant w-32">Student ID</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Student</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Grade/Class</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Guardian Contact</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant w-32">Status</th>
                <th className="p-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors group">
                    <td className="p-4 text-body-sm font-bold text-primary-fixed-variant">{student.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {student.avatar ? (
                          <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full border border-outline-variant" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs border border-outline-variant">
                            {student.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-body-md font-bold text-on-surface">{student.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-body-sm text-on-surface-variant">{student.grade}</td>
                    <td className="p-4 text-body-sm text-on-surface-variant">{student.guardianContact}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30 rounded transition-colors" title="View Profile">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30 rounded transition-colors" title="Edit Student">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant text-body-md">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <p className="text-body-sm text-on-surface-variant">Showing <span className="font-bold text-on-surface">{filteredStudents.length}</span> of <span className="font-bold text-on-surface">{totalStudents}</span> students</p>
          <div className="flex items-center gap-2">
            <button className="p-1 border border-outline-variant rounded hover:bg-surface-container-low text-on-surface-variant disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="p-1 border border-outline-variant rounded hover:bg-surface-container-low text-on-surface-variant disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <h2 className="text-h3 font-h3 text-primary">Add New Student</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-on-surface-variant hover:text-error transition-colors p-1">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-3 py-2 bg-surface border border-outline-variant rounded text-body-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  placeholder="e.g. John Doe"
                  value={newStudent.name}
                  onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Grade / Class</label>
                <select 
                  className="w-full px-3 py-2 bg-surface border border-outline-variant rounded text-body-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={newStudent.grade}
                  onChange={e => setNewStudent({...newStudent, grade: e.target.value})}
                >
                  <option value="Grade 9-C">Grade 9-C</option>
                  <option value="Grade 10-A">Grade 10-A</option>
                  <option value="Grade 10-B">Grade 10-B</option>
                  <option value="Grade 11-A">Grade 11-A</option>
                  <option value="Grade 11-B">Grade 11-B</option>
                  <option value="Grade 12-A">Grade 12-A</option>
                </select>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Guardian Contact</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-surface border border-outline-variant rounded text-body-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  placeholder="e.g. +1 (555) 000-0000"
                  value={newStudent.guardianContact}
                  onChange={e => setNewStudent({...newStudent, guardianContact: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Status</label>
                <select 
                  className="w-full px-3 py-2 bg-surface border border-outline-variant rounded text-body-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={newStudent.status}
                  onChange={e => setNewStudent({...newStudent, status: e.target.value as any})}
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-on-surface-variant font-label-md hover:bg-surface-container transition-colors rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-label-md rounded hover:bg-primary-container transition-colors">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
