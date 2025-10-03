
import React, { useState, useEffect } from 'react';
import type { Employee } from '../types';

interface EmployeeFormModalProps {
  employee: Employee | null;
  onSave: (employee: Employee) => void;
  onClose: () => void;
  employees: Employee[];
}

const INITIAL_FORM_STATE = {
    name: '',
    email: '',
    jobTitle: '',
    location: 'Santa Clara',
    reportingManager: '',
    project: '',
    expertise: '',
    domainExperienceDetails: '',
    clients: '',
    certifications: '',
    genAIExperience: false,
    genAITechnologies: '',
    genAIExperienceDetails: '',
    preSalesExperience: '',
    preSalesExperienceOutsideGL: '',
};

const arrayToText = (arr: any[] | undefined, key?: string, separator: string = ':') => {
    if (!arr) return '';
    if (key) {
        return arr.map(item => `${item[key]}${separator}${item.level}`).join('\n');
    }
    return arr.join(', ');
};

const textToArray = (text: string | undefined) => {
    if (!text) return [];
    return text.split(',').map(s => s.trim()).filter(Boolean);
};

const expertiseToArray = (text: string | undefined): Employee['expertise'] => {
    if (!text) return [];
    return text.split('\n').filter(Boolean).map(line => {
        const parts = line.split(':');
        const domain = parts[0]?.trim() || '';
        const level = (parts[1]?.trim() as Employee['expertise'][0]['level']) || 'Intermediate';
        return { domain, level };
    });
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <input {...props} className="w-full bg-surface border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent" />
    </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; helperText?: string }> = ({ label, helperText, ...props }) => (
     <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <textarea {...props} rows={3} className="w-full bg-surface border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent" />
        {helperText && <p className="mt-1 text-xs text-text-secondary">{helperText}</p>}
    </div>
);


export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ employee, onSave, onClose, employees }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || '',
                email: employee.email || '',
                jobTitle: employee.jobTitle || '',
                location: employee.location || 'Santa Clara',
                reportingManager: employee.reportingManager || '',
                project: employee.project || '',
                expertise: arrayToText(employee.expertise, 'domain'),
                clients: arrayToText(employee.clients),
                certifications: arrayToText(employee.certifications),
                domainExperienceDetails: employee.domainExperienceDetails || '',
                genAIExperience: employee.genAIExperience || false,
                genAITechnologies: employee.genAITechnologies || '',
                genAIExperienceDetails: employee.genAIExperienceDetails || '',
                preSalesExperience: employee.preSalesExperience || '',
                preSalesExperienceOutsideGL: employee.preSalesExperienceOutsideGL || '',
            });
        } else {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [employee]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            alert('Employee Name and Email are required.');
            return;
        }
        
        const newEmail = formData.email.toLowerCase();

        const isEmailTaken = employees.some(
            emp => emp.email.toLowerCase() === newEmail && emp.id !== employee?.id
        );

        if (isEmailTaken) {
            alert('This email address is already in use by another employee.');
            return;
        }

        const finalEmployee: Employee = {
            ...(employee || {}), // Base on existing employee to preserve fields not in form
            id: newEmail,
            name: formData.name,
            email: newEmail,
            jobTitle: formData.jobTitle,
            location: formData.location,
            reportingManager: formData.reportingManager,
            project: formData.project,
            expertise: expertiseToArray(formData.expertise),
            domainExperienceDetails: formData.domainExperienceDetails,
            clients: textToArray(formData.clients),
            certifications: textToArray(formData.certifications),
            genAIExperience: formData.genAIExperience,
            genAITechnologies: formData.genAITechnologies,
            genAIExperienceDetails: formData.genAIExperienceDetails,
            preSalesExperience: formData.preSalesExperience,
            preSalesExperienceOutsideGL: formData.preSalesExperienceOutsideGL,
        };
        onSave(finalEmployee);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start p-4 transition-opacity duration-300 overflow-y-auto"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-surface rounded-lg shadow-xl w-full max-w-3xl my-8 transform transition-transform duration-300 scale-95 animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-6 sm:p-8">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-brand-primary">{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
                            <button type="button" onClick={onClose} className="text-2xl text-text-secondary hover:text-text-primary transition-colors leading-none p-1 -mt-1 -mr-1" aria-label="Close">&times;</button>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-md font-semibold text-text-primary border-b border-slate-200 pb-1 mb-3">Core Information</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                                <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                                <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
                                <Input label="Reporting Manager" name="reportingManager" value={formData.reportingManager} onChange={handleChange} />
                                <Input label="Project" name="project" value={formData.project} onChange={handleChange} />
                            </div>

                            <h3 className="text-md font-semibold text-text-primary border-b border-slate-200 pb-1 mb-3 pt-4">Skills & Experience</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <Textarea label="Domain Expertise" name="expertise" value={formData.expertise} onChange={handleChange} helperText="One per line, e.g., Finance:Expert" />
                                <Textarea label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} helperText="Comma-separated values" />
                                <Textarea label="Client History" name="clients" value={formData.clients} onChange={handleChange} helperText="Comma-separated values" />
                                <Textarea label="Domain Experience Details" name="domainExperienceDetails" value={formData.domainExperienceDetails} onChange={handleChange} />
                             </div>
                             
                             <h3 className="text-md font-semibold text-text-primary border-b border-slate-200 pb-1 mb-3 pt-4">Pre-Sales Experience</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <Textarea label="Inside GlobalLogic" name="preSalesExperience" value={formData.preSalesExperience} onChange={handleChange} />
                                <Textarea label="Outside GlobalLogic" name="preSalesExperienceOutsideGL" value={formData.preSalesExperienceOutsideGL} onChange={handleChange} />
                            </div>
                            
                            <h3 className="text-md font-semibold text-text-primary border-b border-slate-200 pb-1 mb-3 pt-4">Generative AI</h3>
                             <div className="space-y-4">
                                <div className="flex items-center">
                                    <input type="checkbox" id="genAIExperience" name="genAIExperience" checked={formData.genAIExperience} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
                                    <label htmlFor="genAIExperience" className="ml-2 block text-sm text-text-primary">Has Generative AI Experience?</label>
                                </div>
                                <Input label="GenAI Technologies" name="genAITechnologies" value={formData.genAITechnologies} onChange={handleChange} disabled={!formData.genAIExperience} />
                                <Textarea label="GenAI Experience Details" name="genAIExperienceDetails" value={formData.genAIExperienceDetails} onChange={handleChange} disabled={!formData.genAIExperience} />
                            </div>

                        </div>
                    </div>

                    <div className="bg-slate-50 px-6 py-4 rounded-b-lg flex justify-end items-center gap-4">
                        <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-text-primary font-bold py-2 px-4 rounded-md transition">Cancel</button>
                        <button type="submit" className="bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-4 rounded-md transition">Save Changes</button>
                    </div>
                </form>
            </div>
            <style>{`
                @keyframes scale-in {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                animation: scale-in 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
