
import React from 'react';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { MapPin, Building, Calendar, Trash2 } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onDelete?: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(job.id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {job.jobType}
        </span>
        <span className="text-sm font-medium text-green-600">{job.salaryRange}</span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
};
