import React, { useState } from "react";
import { Briefcase, Search, MapPin, Calendar, Filter, Star, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockJobs } from "@/data/mockJobsData";
import { JobType } from "@/types/job";
import { Link } from "react-router-dom";
import { SeedDataButton } from "@/scripts/seedData";
const backgroundImage = '/jobs-background.jpg';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
    const matchesType = selectedType ? job.type === selectedType : true;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredJobs = mockJobs.filter(job => job.featured);

  return (
    <div
      className="container mx-auto py-8 px-4 md:px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 text-white drop-shadow-lg">Creative Opportunities</h1>
          <p className="text-lg text-gray-200 drop-shadow-md">Discover exciting job opportunities in the FanVerse community</p>
        </div>
        <div className="flex items-center">
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:from-purple-600 hover:to-indigo-600">
            <Briefcase className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
          {/* Admin functionality - only in development */}
          {process.env.NODE_ENV !== "production" && <SeedDataButton />}
        </div>
      </div>
      
      {/* Search and filter section */}
      <Card className="mb-8 bg-opacity-80 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="editing">Editing</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Featured Jobs section */}
      {featuredJobs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 flex items-center text-white drop-shadow-lg">
            <Star className="mr-2 h-5 w-5 text-amber-500" />
            Featured Opportunities
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <FeaturedJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}
      
      {/* All Jobs section */}
      <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">All Opportunities ({filteredJobs.length})</h2>
      <div className="grid gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <Card className="bg-opacity-80 backdrop-blur-md">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">No jobs found</h3>
              <p className="text-gray-300">
                No opportunities match your current filters. Try adjusting your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Featured Job Card Component
const FeaturedJobCard = ({ job }: { job: JobType }) => (
  <Card className="overflow-hidden border-2 border-amber-200 dark:border-amber-900/40 hover:shadow-md transition-all duration-200">
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 p-4 flex items-center">
        <div className="w-12 h-12 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden mr-3 shadow-sm">
          <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{job.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
        </div>
      </div>
    </Link>
    <CardContent className="p-4">
      <p className="text-sm text-gray-700 dark:text-gray-300">{job.description}</p>
    </CardContent>
    <CardFooter className="p-4 flex justify-between items-center">
      <span className="text-sm text-gray-500 dark:text-gray-400">{job.location}</span>
      <Link to={`/jobs/${job.id}`} className="text-primary hover:underline">
        View Details
      </Link>
    </CardFooter>
  </Card>
);

// Job Card Component
const JobCard = ({ job }: { job: JobType }) => (
  <Card className="overflow-hidden border hover:shadow-md transition-all duration-200">
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="p-4 flex items-center">
        <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center overflow-hidden mr-3 shadow-sm">
          <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
      </div>
    </Link>
    <CardContent className="p-4">
      <p className="text-sm text-gray-700">{job.description}</p>
    </CardContent>
    <CardFooter className="p-4 flex justify-between items-center">
      <span className="text-sm text-gray-500">{job.location}</span>
      <Link to={`/jobs/${job.id}`} className="text-primary hover:underline">
        View Details
      </Link>
    </CardFooter>
  </Card>
);

export default Jobs;
