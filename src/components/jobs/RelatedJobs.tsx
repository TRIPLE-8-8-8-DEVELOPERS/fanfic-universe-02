
import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobType } from "@/types/job";

interface RelatedJobsProps {
  jobs: JobType[];
}

const RelatedJobs = ({ jobs }: RelatedJobsProps) => {
  if (jobs.length === 0) return null;

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <Card key={job.id} className="overflow-hidden hover:shadow-md transition-all duration-200">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden shadow-sm">
                <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold line-clamp-1">{job.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center">
                    <Briefcase className="h-3.5 w-3.5 mr-1" />
                    {job.company}
                  </span>
                  <span className="hidden sm:inline-block">•</span>
                  <span className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {job.location}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                  {job.salary && (
                    <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
                      {job.salary}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-5 pt-0 flex justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/jobs/${job.id}`}>
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RelatedJobs;
