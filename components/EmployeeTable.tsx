
import React, { useState, useMemo } from 'react';
import type { Employee } from '../types';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeDetailModal } from './EmployeeDetailModal';

interface EmployeeDirectoryProps {
  employees: Employee[];
  onAddClick: () => void;
  onEditClick: (employee: Employee) => void;
  onDeleteClick: (employee: Employee) => void;
}

export const EmployeeTable: React.FC<EmployeeDirectoryProps> = ({ employees, onAddClick, onEditClick, onDeleteClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = useMemo(() => {
    const sortedEmployees = [...employees].sort((a, b) => a.name.localeCompare(b.name));
    if (!searchTerm) return sortedEmployees;

    const lowercasedFilter = searchTerm.toLowerCase();
    
    return sortedEmployees.filter(employee =>
      Object.entries(employee).some(([key, value]) => {
        if (typeof value === 'string') return value.toLowerCase().includes(lowercasedFilter);
        if (Array.isArray(value)) return value.some(item => typeof item === 'string' && item.toLowerCase().includes(lowercasedFilter));
        if(key === 'expertise' && Array.isArray(value)) return value.some((item: any) => item?.domain?.toLowerCase().includes(lowercasedFilter));
        return false;
      })
    );
  }, [employees, searchTerm]);

  return (
    <div className="bg-surface rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2 sm:mb-0">Employee Directory ({filteredEmployees.length})</h3>
        <div className="flex w-full sm:w-auto items-center gap-2">
            <input
              type="text"
              placeholder="Search directory..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-surface border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Search employee directory"
            />
            <button
                onClick={onAddClick}
                className="bg-accent hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out whitespace-nowrap"
            >
                Add Employee
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <EmployeeCard 
            key={employee.id} 
            employee={employee} 
            onCardClick={setSelectedEmployee}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-10 text-text-secondary">
          <p>No employees found matching your criteria.</p>
        </div>
      )}

      {selectedEmployee && (
        <EmployeeDetailModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </div>
  );
};
