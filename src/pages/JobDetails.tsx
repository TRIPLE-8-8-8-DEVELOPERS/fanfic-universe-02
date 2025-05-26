import React from "react";
import { useParams } from "react-router-dom";
import { mockJobs } from "@/data/mockJobsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job = mockJobs.find((job) => job.id === jobId);

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
          <p className="text-muted-foreground">{job.company}</p>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{job.description}</p>
          <h3 className="text-xl font-semibold mb-2">Requirements:</h3>
          <ul className="list-disc list-inside mb-4">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Responsibilities:</h3>
          <ul className="list-disc list-inside mb-4">
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
          <p className="text-muted-foreground">Location: {job.location}</p>
          <p className="text-muted-foreground">Salary: {job.salary}</p>
          <p className="text-muted-foreground">Posted: {job.posted}</p>
          <p className="text-muted-foreground">Deadline: {job.deadline}</p>
        </CardContent>
        <div className="p-4">
          <Button className="w-full">Apply Now</Button>
        </div>
      </Card>
    </div>
  );
};

export default JobDetails;
