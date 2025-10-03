
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { initialEmployees, filterOptions } from '../data/employeeData';
import type { Employee, Filters, ChartData } from '../types';
import { NLPQuery } from './NLPQuery';
import { Filters as FiltersComponent } from './Filters';
import { EmployeeTable } from './EmployeeTable';
import { DomainChart } from './charts/DomainChart';
import { CertificationChart } from './charts/CertificationChart';
import { LocationMap } from './LocationMap';
import { ClientChart } from './charts/ClientChart';
import { Card } from './ui/Card';
import { parseQueryToFilters } from '../services/geminiService';
import { Stats } from './Stats';
import { EmployeeFormModal } from './EmployeeFormModal';
import ConfirmationModal from './ConfirmationModal';


const INITIAL_FILTERS: Filters = {
    domain: [],
    certification: [],
    client: [],
    location: [],
    manager: [],
    skills: [],
    hasPreSalesExperience: false,
};

const LOCAL_STORAGE_KEY = 'employee_dashboard_data';

// Load initial employees from localStorage or fall back to the default data
const getInitialEmployees = (): Employee[] => {
  try {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData)) {
        return parsedData;
      }
    }
  } catch (error) {
    console.error("Failed to load or parse employee data from localStorage:", error);
  }
  // If nothing in local storage or data is invalid, return initial data and save it.
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialEmployees));
  return initialEmployees;
};


// For domain and certification (employee can have multiple)
const aggregateMultiData = (employees: Employee[], key: 'domain' | 'certification'): ChartData[] => {
    const counts = new Map<string, number>();
    employees.forEach(employee => {
        if (key === 'domain') {
            employee.expertise.forEach(exp => {
                counts.set(exp.domain, (counts.get(exp.domain) || 0) + 1);
            });
        } else if (key === 'certification') {
            employee.certifications.forEach(cert => {
                counts.set(cert, (counts.get(cert) || 0) + 1);
            });
        }
    });
    return Array.from(counts.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
};

// For clients/projects (can have multiple)
const aggregateClientData = (employees: Employee[]): ChartData[] => {
    const counts = new Map<string, number>();
    employees.forEach(employee => {
        const clientSet = new Set<string>();
        if(employee.project) clientSet.add(employee.project);
        employee.clients.forEach(c => clientSet.add(c));

        clientSet.forEach(client => {
             counts.set(client, (counts.get(client) || 0) + 1);
        });
    });
     return Array.from(counts.entries())
        .filter(([name]) => name.toLowerCase() !== 'clients nda' && name.toLowerCase() !== 'nda')
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
};


export const Dashboard: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>(getInitialEmployees);
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

    // Save employees to localStorage whenever the state changes.
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
        } catch (error) {
            console.error("Failed to save employee data to localStorage:", error);
        }
    }, [employees]);


    const filteredEmployees = useMemo(() => {
        let filtered = [...employees];

        if (filters.domain.length > 0) {
            filtered = filtered.filter(e => e.expertise.some(exp => filters.domain.includes(exp.domain)));
        }
        if (filters.certification.length > 0) {
            filtered = filtered.filter(e => e.certifications.some(cert => filters.certification.includes(cert)));
        }
        if (filters.client.length > 0) {
            filtered = filtered.filter(e => 
                filters.client.some(fc => e.clients.some(ec => ec.toLowerCase().includes(fc.toLowerCase())))
                || filters.client.some(fc => e.project.toLowerCase().includes(fc.toLowerCase()))
            );
        }
        if (filters.location.length > 0) {
            filtered = filtered.filter(e => filters.location.includes(e.location));
        }
        if (filters.manager.length > 0) {
            filtered = filtered.filter(e => filters.manager.includes(e.reportingManager));
        }
        if (filters.hasPreSalesExperience) {
            filtered = filtered.filter(e =>
                (e.preSalesExperience && e.preSalesExperience.trim() !== '') ||
                (e.preSalesExperienceOutsideGL && e.preSalesExperienceOutsideGL.trim() !== '')
            );
        }
        if (filters.skills.length > 0) {
             filtered = filtered.filter(e => {
                const baseSearchableText = [
                    e.name,
                    e.jobTitle,
                    e.location,
                    e.reportingManager,
                    e.project,
                    e.domainExperienceDetails,
                    e.genAITechnologies,
                    e.genAIExperienceDetails,
                    e.preSalesExperience,
                    e.preSalesExperienceOutsideGL,
                    ...e.clients,
                    ...e.certifications,
                    ...e.expertise.map(exp => `${exp.domain} ${exp.level}`)
                ].join(' ').toLowerCase();
                
                const searchableText = baseSearchableText.replace(/-/g, ' ');
                const compactSearchableText = baseSearchableText.replace(/[- ]/g, '');

                return filters.skills.every(skill => {
                    const lowerSkill = skill.toLowerCase();
                    if (!lowerSkill) return true;

                    if (skill.includes(' ')) {
                        const phrase = lowerSkill.replace(/-/g, ' ');
                        return searchableText.includes(phrase);
                    }
                    
                    const compactSkill = lowerSkill.replace(/-/g, '');
                    return compactSearchableText.includes(compactSkill);
                });
            });
        }
        return filtered;
    }, [employees, filters]);

    const handleQuerySubmit = useCallback(async (query: string) => {
        setIsLoadingAI(true);
        setAiResponse(null);
        const result = await parseQueryToFilters(query);

        if (result.error) {
            setAiResponse(result.error);
        } else if (result.clarification) {
            setAiResponse(result.clarification);
        } else if (result.filters) {
            setFilters(prev => ({ ...INITIAL_FILTERS, ...result.filters }));
        }
        setIsLoadingAI(false);
    }, []);

    const handleChartClick = useCallback((filterKey: keyof Filters, value: string) => {
        const filterNameMapping: Record<string, string> = {
            domain: "Domain",
            certification: "Certification",
            client: "Client/Project",
            location: "Location",
            manager: "Manager",
            skills: "Skill"
        };
        setAiResponse(`Filtering by ${filterNameMapping[filterKey] || 'Category'}: "${value}"`);
        setFilters({
            ...INITIAL_FILTERS,
            [filterKey]: [value],
        });
    }, []);

    const resetFilters = useCallback(() => {
      setFilters(INITIAL_FILTERS);
      setAiResponse(null);
    }, []);

    // --- CRUD Handlers ---
    const handleOpenAddModal = () => {
        setEditingEmployee(null);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsFormModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsFormModalOpen(false);
        setEditingEmployee(null);
    };

    const handleSaveEmployee = (employeeToSave: Employee) => {
        setEmployees(prev => {
            if (editingEmployee) {
                // Update: find employee by the original ID and replace it
                return prev.map(e => (e.id === editingEmployee.id ? employeeToSave : e));
            } else {
                // Add: email uniqueness is validated in the form, so just add
                return [...prev, employeeToSave];
            }
        });
        handleCloseModal();
    };

    const handleDeleteRequest = (employee: Employee) => {
        setEmployeeToDelete(employee);
    };

    const handleConfirmDelete = () => {
        if (!employeeToDelete) return;
        setEmployees(prev => prev.filter(e => e.id !== employeeToDelete.id));
        setEmployeeToDelete(null);
    };
    // --- End CRUD Handlers ---

    const statsData = useMemo(() => {
        const locations = new Set<string>(filteredEmployees.map(e => e.location).filter(Boolean));
        const clients = new Set<string>();

        filteredEmployees.forEach(employee => {
            if (employee.project) clients.add(employee.project);
            employee.clients.forEach(c => clients.add(c));
        });

        const uniqueClients = Array.from(clients).filter(name => name.toLowerCase() !== 'clients nda' && name.toLowerCase() !== 'nda');

        return {
            totalEmployees: filteredEmployees.length,
            totalLocations: locations.size,
            totalClients: uniqueClients.length,
        };
    }, [filteredEmployees]);
    
    const domainChartData = useMemo(() => aggregateMultiData(filteredEmployees, 'domain'), [filteredEmployees]);
    const certificationChartData = useMemo(() => aggregateMultiData(filteredEmployees, 'certification'), [filteredEmployees]);
    const clientChartData = useMemo(() => aggregateClientData(filteredEmployees), [filteredEmployees]);

    const isFiltered = useMemo(() => JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTERS), [filters]);
    const filteredTitleSuffix = isFiltered ? ' (Filtered)' : '';

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar for Filters */}
            <aside className="lg:w-1/4 xl:w-1/5">
                 <div className="sticky top-8 space-y-6">
                    <div className="bg-surface rounded-lg shadow-lg p-4 sm:p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Filter Employees</h3>
                        <FiltersComponent filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
                         <div className="mt-6">
                            <button
                                onClick={resetFilters}
                                className="w-full bg-slate-200 hover:bg-slate-300 text-text-primary font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-6">
                <Stats 
                    totalEmployees={statsData.totalEmployees} 
                    totalLocations={statsData.totalLocations}
                    totalClients={statsData.totalClients}
                />
                <NLPQuery onQuerySubmit={handleQuerySubmit} isLoading={isLoadingAI} aiResponse={aiResponse} onQueryClear={resetFilters} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     <Card title={`Employees by Domain Expertise${filteredTitleSuffix}`}>
                        <DomainChart data={domainChartData} onDomainClick={(domain) => handleChartClick('domain', domain)} />
                     </Card>
                     <Card title={`Top Certifications${filteredTitleSuffix}`}>
                        <CertificationChart data={certificationChartData} onCertificationClick={(cert) => handleChartClick('certification', cert)} />
                     </Card>
                     <Card title={`Employee Locations${filteredTitleSuffix}`}>
                        <LocationMap employees={filteredEmployees} onLocationClick={(location) => handleChartClick('location', location)} />
                     </Card>
                     <Card title={`Top Client/Project Allocations${filteredTitleSuffix}`}>
                        <ClientChart data={clientChartData} onClientClick={(client) => handleChartClick('client', client)} />
                     </Card>
                </div>

                <EmployeeTable 
                    employees={filteredEmployees} 
                    onAddClick={handleOpenAddModal}
                    onEditClick={handleOpenEditModal}
                    onDeleteClick={handleDeleteRequest}
                />
            </main>
            {isFormModalOpen && (
                 <EmployeeFormModal 
                    employee={editingEmployee}
                    onSave={handleSaveEmployee}
                    onClose={handleCloseModal}
                    employees={employees}
                 />
            )}
            {employeeToDelete && (
                 <ConfirmationModal
                    isOpen={!!employeeToDelete}
                    onClose={() => setEmployeeToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    title="Confirm Deletion"
                    message={`Are you sure you want to delete ${employeeToDelete.name}? This action cannot be undone.`}
                 />
            )}
        </div>
    );
};
