import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Select: React.FC<SelectProps> = ({ label, children, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-text-secondary mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full bg-surface border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-text-primary"
      >
        {children}
      </select>
    </div>
  );
};