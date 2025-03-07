
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Briefcase, MapPin, Calendar, Clock, Building, CheckCircle2, 
  ArrowLeft, Share2, Bookmark, DollarSign, Globe, AlertCircle
} from "lucide-react";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockJobs } from "@/data/mockJobsData";
import RelatedJobs from "@/components/jobs/RelatedJobs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getJobById, getRelatedJobs } from "@/services/jobService";
import { toast } from "sonner";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  
  // Fetch job details
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => jobId ? getJobById(jobId) : null,
    enabled: !!jobId,
  });

  // Fetch related jobs based on category
  const { data: relatedJobs = [] } = useQuery({
    queryKey: ['relatedJobs', job?.category, jobId],
    queryFn: () => job && jobId ? getRelatedJobs(jobId, job.category) : Promise.resolve([]),
    enabled: !!job && !!jobId,
  });
  
  // Handle errors - use mock data as fallback
  React.useEffect(() => {
    if (error) {
      toast.error("Failed to fetch job details. Using mock data instead.");
    }
  }, [error]);

  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading job details...</p>
      </div>
    );
  }

  // If job not found, show error and option to go back
  if (!job && !isLoading) {
    const mockJob = jobId ? mockJobs.find(j => j.id === jobId) : null;
    
    if (!mockJob) {
      return (
        <div className="container mx-auto py-16 px-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <p className="text-muted-foreground mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>
        </div>
      );
    }
    
    // Use mock job as fallback if the real job wasn't found
    return <JobDetailsContent job={mockJob} relatedJobs={mockJobs.filter(j => j.id !== mockJob.id && j.category === mockJob.category).slice(0, 3)} />;
  }

  return <JobDetailsContent job={job!} relatedJobs={relatedJobs} />;
};

// Extracted Job Details Content component
const JobDetailsContent = ({ job, relatedJobs }: { job: NonNullable<ReturnType<typeof getJobById> extends Promise<infer T> ? T : never>, relatedJobs: ReturnType<typeof getRelatedJobs> extends Promise<infer T> ? T : never }) => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <Link 
          to="/jobs" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden shadow-sm">
                    <img src={job.logo} alt={job.company} className="w-14 h-14 object-contain" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </span>
                      <span className="hidden sm:inline-block">•</span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" title="Save job">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="Share job">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="px-3 py-1">
                  <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                  {job.type}
                </Badge>
                {job.salary && (
                  <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400 px-3 py-1">
                    <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                    {job.salary}
                  </Badge>
                )}
                <Badge variant="outline" className="px-3 py-1">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  Deadline: {typeof job.deadline === 'string' ? job.deadline : new Date(job.deadline).toLocaleDateString()}
                </Badge>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">About the role</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <Separator className="mb-6" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between w-full">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Posted {typeof job.posted === 'string' ? job.posted : new Date(job.posted).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button>Apply Now</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Similar Opportunities</h2>
              <RelatedJobs jobs={relatedJobs} />
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About the Company</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden shadow-sm mb-4">
                  <img src={job.logo} alt={job.company} className="w-16 h-16 object-contain" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{job.company}</h3>
                <p className="text-sm text-muted-foreground">Creative Writing Studio</p>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">Visit website</a>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Company Profile
              </Button>
            </CardFooter>
          </Card>
          
          {/* Apply Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Apply for this job</CardTitle>
              <CardDescription>Submit your application today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Join our creative team and work on exciting projects in the FanVerse community.
              </p>
              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>
          
          {/* Hiring Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hiring Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">Talent Acquisition</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Recruiter
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
