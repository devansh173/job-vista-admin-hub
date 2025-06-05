
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { JobFilters as JobFiltersType } from '@/types/job';

interface JobFiltersProps {
  filters: JobFiltersType;
  onFiltersChange: (filters: JobFiltersType) => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleTitleChange = (value: string) => {
    onFiltersChange({ ...filters, title: value || undefined });
  };

  const handleLocationChange = (value: string) => {
    onFiltersChange({ ...filters, location: value || undefined });
  };

  const handleJobTypeChange = (value: string) => {
    onFiltersChange({ ...filters, jobType: value === 'all' ? undefined : value });
  };

  const handleSalaryRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, salaryRange: [value[0], value[1]] });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="titleFilter">Job Title</Label>
          <Input
            id="titleFilter"
            placeholder="Search by job title"
            value={filters.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="locationFilter">Location</Label>
          <Input
            id="locationFilter"
            placeholder="Search by location"
            value={filters.location || ''}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="jobTypeFilter">Job Type</Label>
          <Select value={filters.jobType || 'all'} onValueChange={handleJobTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All job types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All job types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Salary Range</Label>
          <div className="px-2 py-4">
            <Slider
              value={filters.salaryRange || [0, 200000]}
              onValueChange={handleSalaryRangeChange}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>${(filters.salaryRange?.[0] || 0).toLocaleString()}</span>
              <span>${(filters.salaryRange?.[1] || 200000).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
