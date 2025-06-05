
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salaryRange: string;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
  createdAt: string;
}

export interface JobFilters {
  title?: string;
  location?: string;
  jobType?: string;
  salaryRange?: [number, number];
}

export interface CreateJobData {
  title: string;
  company: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salaryRange: string;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
}
