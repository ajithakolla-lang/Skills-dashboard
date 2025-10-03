
export interface Employee {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  location: string;
  reportingManager: string;
  project: string;
  expertise: { domain: string; level: 'Expert' | 'Intermediate' | 'Primary Expert' }[];
  domainExperienceDetails: string;
  clients: string[];
  certifications: string[];
  genAIExperience: boolean;
  genAITechnologies?: string;
  genAIExperienceDetails?: string;
  preSalesExperience: string;
  preSalesExperienceOutsideGL: string;
}

export interface Filters {
  domain: string[];
  certification: string[];
  client: string[];
  location: string[];
  manager: string[];
  skills: string[];
  hasPreSalesExperience?: boolean;
}

export interface ChartData {
  name: string;
  value: number;
}