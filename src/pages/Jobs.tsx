
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Job, JobFilters as JobFiltersType, CreateJobData } from '@/types/job';
import { jobApi } from '@/services/jobApi';
import { JobFilters } from '@/components/JobFilters';
import { JobCard } from '@/components/JobCard';
import { JobCreateForm } from '@/components/JobCreateForm';
import { Plus, Briefcase } from 'lucide-react';

export const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFiltersType>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadJobs();
  }, [filters]);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      const data = await jobApi.getJobs(filters);
      setJobs(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load jobs",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateJob = async (jobData: CreateJobData) => {
    setIsCreating(true);
    try {
      await jobApi.createJob(jobData);
      toast({
        title: "Success",
        description: "Job created successfully"
      });
      setShowCreateForm(false);
      loadJobs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await jobApi.deleteJob(id);
      toast({
        title: "Success",
        description: "Job deleted successfully"
      });
      loadJobs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
                <p className="text-gray-600">Manage your job postings</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Job
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} onDelete={handleDeleteJob} />
                ))}
                {jobs.length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600">Try adjusting your filters or create a new job posting.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Job Modal */}
      {showCreateForm && (
        <JobCreateForm
          onSubmit={handleCreateJob}
          onClose={() => setShowCreateForm(false)}
          isLoading={isCreating}
        />
      )}
    </div>
  );
};
