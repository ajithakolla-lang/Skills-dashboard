
import React from 'react';
import type { Employee } from '../types';

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ProjectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);


interface EmployeeCardProps {
  employee: Employee;
  onCardClick: (employee: Employee) => void;
  onEditClick: (employee: Employee) => void;
  onDeleteClick: (employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onCardClick, onEditClick, onDeleteClick }) => {
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick(employee);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick(employee);
  };

  return (
    <div
      onClick={() => onCardClick(employee)}
      className="bg-surface rounded-lg shadow-md p-4 flex flex-col text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
      aria-label={`View details for ${employee.name}`}
    >
      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-brand-primary truncate">{employee.name}</h4>
                <p className="text-sm text-text-secondary mb-3 truncate">{employee.jobTitle}</p>
            </div>
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={handleEdit} aria-label={`Edit ${employee.name}`} className="p-1.5 rounded-full text-slate-500 hover:bg-slate-200 hover:text-accent"><EditIcon/></button>
                <button onClick={handleDelete} aria-label={`Delete ${employee.name}`} className="p-1.5 rounded-full text-slate-500 hover:bg-slate-200 hover:text-red-500"><DeleteIcon/></button>
            </div>
        </div>
        
        <div className="space-y-1.5 text-sm">
            <div className="flex items-center text-text-secondary">
              <ProjectIcon />
              <span className="ml-2 truncate">{employee.project || 'N/A'}</span>
            </div>
            <div className="flex items-center text-text-secondary">
              <LocationIcon />
              <span className="ml-2 truncate">{employee.location}</span>
            </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-200">
        <p className="text-xs font-semibold text-text-primary mb-2">Top Skills</p>
        <div className="flex flex-wrap gap-1">
          {employee.expertise.slice(0, 3).map((exp) => (
            <span key={exp.domain} className="bg-slate-200 text-slate-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {exp.domain}
            </span>
          ))}
          {employee.expertise.length === 0 && <span className="text-xs text-text-secondary italic">No skills listed.</span>}
        </div>
      </div>
    </div>
  );
};
