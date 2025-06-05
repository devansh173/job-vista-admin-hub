
import { Job, CreateJobData, JobFilters } from '@/types/job';

// Mock data for demonstration
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    salaryRange: '$120,000 - $150,000',
    description: 'We are looking for a Senior Frontend Developer to join our team.',
    requirements: 'React, TypeScript, 5+ years experience',
    responsibilities: 'Build user interfaces, collaborate with design team',
    applicationDeadline: '2024-07-15',
    createdAt: '2024-06-01'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'New York, NY',
    jobType: 'Full-time',
    salaryRange: '$100,000 - $130,000',
    description: 'Lead product strategy and development.',
    requirements: 'MBA, 3+ years PM experience',
    responsibilities: 'Define roadmap, work with engineering team',
    applicationDeadline: '2024-07-20',
    createdAt: '2024-06-02'
  }
];

export const jobApi = {
  async getJobs(filters?: JobFilters): Promise<Job[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredJobs = [...mockJobs];
    
    if (filters?.title) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(filters.title!.toLowerCase())
      );
    }
    
    if (filters?.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters?.jobType) {
      filteredJobs = filteredJobs.filter(job => job.jobType === filters.jobType);
    }
    
    return filteredJobs;
  },

  async createJob(jobData: CreateJobData): Promise<Job> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      ...jobData,
      createdAt: new Date().toISOString()
    };
    
    mockJobs.push(newJob);
    return newJob;
  },

  async deleteJob(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockJobs.findIndex(job => job.id === id);
    if (index > -1) {
      mockJobs.splice(index, 1);
    }
  }
};
