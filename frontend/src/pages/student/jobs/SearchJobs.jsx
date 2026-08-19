import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Search, MapPin, Building2, Briefcase, Filter } from 'lucide-react';

export default function SearchJobs() {
  const { register, handleSubmit } = useForm();

  const onSearch = (data) => {
    console.log('Search Data:', data);
    // In a real app, this would trigger the Axios API call with query params
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Advanced Search</h1>
        <p className="text-slate-600 dark:text-slate-400">Find exactly what you're looking for using granular filters.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSearch)} className="space-y-6">
            
            {/* Primary Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or skills..." 
                  {...register('keyword')}
                  className="w-full pl-10 input-field h-12 text-lg"
                />
              </div>
              <div className="md:w-1/3 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="City, state, or remote" 
                  {...register('location')}
                  className="w-full pl-10 input-field h-12 text-lg"
                />
              </div>
              <Button type="submit" className="h-12 px-8 text-lg shrink-0">Find Jobs</Button>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center mb-4">
                <Filter className="w-4 h-4 mr-2 text-brand-500" /> Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Job Type</label>
                  <select {...register('type')} className="input-field">
                    <option value="">Any</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Workplace Model</label>
                  <select {...register('model')} className="input-field">
                    <option value="">Any</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Experience Level</label>
                  <select {...register('experience')} className="input-field">
                    <option value="">Any</option>
                    <option value="Entry">Entry Level (0-2 years)</option>
                    <option value="Mid">Mid Level (3-5 years)</option>
                    <option value="Senior">Senior Level (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Salary Range</label>
                  <select {...register('salary')} className="input-field">
                    <option value="">Any</option>
                    <option value="50-80">$50k - $80k</option>
                    <option value="80-120">$80k - $120k</option>
                    <option value="120+">$120k+</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
               <h3 className="font-semibold text-slate-900 dark:text-white flex items-center mb-4">
                 Sort By
               </h3>
               <div className="flex gap-4">
                 {['Best Match', 'Latest', 'Highest Salary'].map((sort, idx) => (
                   <label key={idx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                     <input type="radio" value={sort} {...register('sortBy')} defaultChecked={idx === 0} className="text-brand-500 focus:ring-brand-500 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
                     {sort}
                   </label>
                 ))}
               </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Search results placeholder area */}
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Enter your search criteria</h3>
        <p className="text-slate-500">Results will appear here.</p>
      </div>
    </div>
  );
}
