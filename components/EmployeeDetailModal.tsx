
import React, { useEffect } from 'react';
import type { Employee } from '../types';

const DetailSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`mb-5 ${className}`}>
    <h4 className="text-md font-semibold text-text-primary border-b border-slate-200 pb-1 mb-3">{title}</h4>
    {children}
  </div>
);

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-text-secondary font-medium">{label}</p>
    <p className="text-sm text-text-primary">{value}</p>
  </div>
);

const Pill: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-block bg-slate-200 text-slate-800 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">{text}</span>
);

export const EmployeeDetailModal: React.FC<{ employee: Employee; onClose: () => void }> = ({ employee, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="employee-detail-title"
    >
      <div
        className="bg-surface rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 transform transition-transform duration-300 scale-95 animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 id="employee-detail-title" className="text-2xl font-bold text-brand-primary">{employee.name}</h2>
            <p className="text-md text-text-secondary">{employee.jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-text-secondary hover:text-text-primary transition-colors leading-none p-1 -mt-1 -mr-1"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4 bg-slate-50 p-4 rounded-md border border-slate-200">
            <InfoItem label="Email" value={<a href={`mailto:${employee.email}`} className="text-brand-secondary hover:underline">{employee.email}</a>} />
            <InfoItem label="Location" value={employee.location} />
            <InfoItem label="Reporting Manager" value={employee.reportingManager} />
            <InfoItem label="Current Project" value={employee.project} />
        </div>
        
        {employee.expertise.length > 0 && (
            <DetailSection title="Domain Expertise">
                <div className="flex flex-wrap">
                {employee.expertise.map(exp => (
                    <Pill key={exp.domain} text={`${exp.domain} (${exp.level})`} />
                ))}
                </div>
            </DetailSection>
        )}
        
        {employee.clients.length > 0 && (
            <DetailSection title="Client History">
                 <div className="flex flex-wrap">
                    {employee.clients.map(client => <Pill key={client} text={client} />)}
                 </div>
            </DetailSection>
        )}

        {employee.certifications.length > 0 && (
            <DetailSection title="Certifications">
                 <div className="flex flex-wrap">
                    {employee.certifications.map(cert => <Pill key={cert} text={cert} />)}
                </div>
            </DetailSection>
        )}

        {employee.genAIExperience && (
            <DetailSection title="Generative AI Experience">
                <InfoItem label="Technologies" value={employee.genAITechnologies || 'N/A'} />
                <p className="text-sm text-text-secondary mt-2 whitespace-pre-wrap">{employee.genAIExperienceDetails || ''}</p>
            </DetailSection>
        )}

        {employee.preSalesExperience && (
            <DetailSection title="Pre-Sale Experience in GlobalLogic">
                <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{employee.preSalesExperience}</p>
            </DetailSection>
        )}

        {employee.preSalesExperienceOutsideGL && (
            <DetailSection title="Pre-Sale Experience outside GlobalLogic">
                <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{employee.preSalesExperienceOutsideGL}</p>
            </DetailSection>
        )}

        {employee.domainExperienceDetails && (
            <DetailSection title="Domain Experience Details">
                <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{employee.domainExperienceDetails}</p>
            </DetailSection>
        )}

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