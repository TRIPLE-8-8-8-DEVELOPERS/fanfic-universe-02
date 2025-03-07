
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
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Creative Opportunities</h1>
          <p className="text-muted-foreground">Discover exciting job opportunities in the FanVerse community</p>
        </div>
        <Button>
          <Briefcase className="mr-2 h-4 w-4" />
          Post a Job
        </Button>
      </div>
      
      {/* Search and filter section */}
      <Card className="mb-8">
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
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="editing">Editing</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
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
                  <SelectItem value="">All Types</SelectItem>
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
          <h2 className="text-2xl font-bold mb-4 flex items-center">
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
      <h2 className="text-2xl font-bold mb-4">All Opportunities ({filteredJobs.length})</h2>
      <div className="grid gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
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
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 p-4 flex items-center">
      <div className="w-12 h-12 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden mr-3 shadow-sm">
        <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" />
      </div>
      <div>
        <h3 className="font-semibold line-clamp-1">{job.title}</h3>
        <p className="text-sm text-muted-foreground">{job.company}</p>
      </div>
    </div>
    <CardContent className="p-4">
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
          <span>Posted {job.posted}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        <Badge variant="secondary">{job.type}</Badge>
        <Badge variant="outline">{job.category}</Badge>
        {job.salary && (
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
            {job.salary}
          </Badge>
        )}
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0 flex justify-end">
      <Button size="sm" variant="secondary">View Details</Button>
    </CardFooter>
  </Card>
);

// Job Card Component
const JobCard = ({ job }: { job: JobType }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden shadow-sm">
            <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Briefcase className="h-3.5 w-3.5 mr-1" />
                {job.company}
              </span>
              <span className="hidden md:inline-block">•</span>
              <span className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {job.location}
              </span>
              <span className="hidden md:inline-block">•</span>
              <span className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Deadline: {job.deadline}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <Badge variant="secondary">{job.type}</Badge>
          <Badge variant="outline">{job.category}</Badge>
          {job.salary && (
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
              {job.salary}
            </Badge>
          )}
        </div>
      </div>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {job.tags?.map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs bg-background">{tag}</Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-6 pt-0 flex justify-between items-center">
      <span className="text-sm text-muted-foreground">Posted {job.posted}</span>
      <Button>View Details</Button>
    </CardFooter>
  </Card>
);

export default Jobs;
