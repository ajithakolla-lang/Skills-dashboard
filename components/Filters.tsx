import React from 'react';
import type { Filters as FiltersType } from '../types';
import { Select } from './ui/Select';

interface FiltersProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  filterOptions: {
    domains: string[];
    certifications: string[];
    clients: string[];
    locations: string[];
    managers: string[];
  };
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, filterOptions }) => {
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, filterKey: keyof FiltersType) => {
    const { value } = e.target;
    setFilters(prev => ({
      ...prev,
      [filterKey]: value ? [value] : [],
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4">
        <Select
          label="Domain Expertise"
          value={filters.domain[0] || ''}
          onChange={e => handleSelectChange(e, 'domain')}
        >
          <option value="">All Domains</option>
          {filterOptions.domains.map(d => <option key={d} value={d}>{d}</option>)}
        </Select>
        <Select
          label="Certification"
          value={filters.certification[0] || ''}
          onChange={e => handleSelectChange(e, 'certification')}
        >
          <option value="">All Certifications</option>
          {filterOptions.certifications.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select
          label="Client"
          value={filters.client[0] || ''}
          onChange={e => handleSelectChange(e, 'client')}
        >
          <option value="">All Clients</option>
          {filterOptions.clients.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select
          label="Location"
          value={filters.location[0] || ''}
          onChange={e => handleSelectChange(e, 'location')}
        >
          <option value="">All Locations</option>
          {filterOptions.locations.map(l => <option key={l} value={l}>{l}</option>)}
        </Select>
        <Select
          label="Manager"
          value={filters.manager[0] || ''}
          onChange={e => handleSelectChange(e, 'manager')}
        >
          <option value="">All Managers</option>
          {filterOptions.managers.map(m => <option key={m} value={m}>{m}</option>)}
        </Select>
      </div>
  );
};