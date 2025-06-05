
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateJobData } from '@/types/job';
import { X } from 'lucide-react';

interface JobCreateFormProps {
  onSubmit: (data: CreateJobData) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export const JobCreateForm: React.FC<JobCreateFormProps> = ({
  onSubmit,
  onClose,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CreateJobData>();

  const jobType = watch('jobType');

  const handleFormSubmit = async (data: CreateJobData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Create New Job</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Job title is required' })}
              placeholder="Enter job title"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              {...register('company', { required: 'Company name is required' })}
              placeholder="Enter company name"
            />
            {errors.company && <span className="text-red-500 text-sm">{errors.company.message}</span>}
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register('location', { required: 'Location is required' })}
              placeholder="Enter location"
            />
            {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
          </div>

          <div>
            <Label htmlFor="jobType">Job Type</Label>
            <Select
              value={jobType}
              onValueChange={(value) => setValue('jobType', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            {errors.jobType && <span className="text-red-500 text-sm">{errors.jobType.message}</span>}
          </div>

          <div>
            <Label htmlFor="salaryRange">Salary Range</Label>
            <Input
              id="salaryRange"
              {...register('salaryRange', { required: 'Salary range is required' })}
              placeholder="e.g., $50,000 - $70,000"
            />
            {errors.salaryRange && <span className="text-red-500 text-sm">{errors.salaryRange.message}</span>}
          </div>

          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Job description is required' })}
              placeholder="Enter job description"
              rows={4}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>

          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              {...register('requirements', { required: 'Requirements are required' })}
              placeholder="Enter job requirements"
              rows={3}
            />
            {errors.requirements && <span className="text-red-500 text-sm">{errors.requirements.message}</span>}
          </div>

          <div>
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <Textarea
              id="responsibilities"
              {...register('responsibilities', { required: 'Responsibilities are required' })}
              placeholder="Enter job responsibilities"
              rows={3}
            />
            {errors.responsibilities && <span className="text-red-500 text-sm">{errors.responsibilities.message}</span>}
          </div>

          <div>
            <Label htmlFor="applicationDeadline">Application Deadline</Label>
            <Input
              id="applicationDeadline"
              type="date"
              {...register('applicationDeadline', { required: 'Application deadline is required' })}
            />
            {errors.applicationDeadline && <span className="text-red-500 text-sm">{errors.applicationDeadline.message}</span>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Creating...' : 'Create Job'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
