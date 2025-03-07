
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedJobs } from "./seedJobsData";
import { toast } from "sonner";

export const SeedDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  
  const handleSeedData = async () => {
    try {
      setIsSeeding(true);
      await seedJobs();
      toast.success("Successfully seeded jobs data!");
    } catch (error) {
      console.error("Error seeding data:", error);
      toast.error("Failed to seed data. Check console for details.");
    } finally {
      setIsSeeding(false);
    }
  };
  
  return (
    <Button 
      onClick={handleSeedData} 
      disabled={isSeeding}
      size="sm"
      className="ml-2"
    >
      {isSeeding ? "Seeding..." : "Seed Jobs Data"}
    </Button>
  );
};
