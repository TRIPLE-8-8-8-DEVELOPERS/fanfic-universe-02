
import { supabase } from "../integrations/supabase/client";
import { mockJobs } from "../data/mockJobsData";

const seedJobs = async () => {
  // Convert JavaScript Date objects to ISO strings for Supabase
  const processedJobs = mockJobs.map(job => {
    // For demo purposes, set deadlines in the future
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 30); // 30 days from now
    
    return {
      ...job,
      deadline: deadline.toISOString(), // Convert Date to ISO string
      posted: new Date().toISOString(), // Convert Date to ISO string
    };
  });

  // Insert the jobs into the database
  const { data, error } = await supabase.from('jobs').insert(processedJobs);
  
  if (error) {
    console.error('Error seeding jobs:', error);
  } else {
    console.log('Successfully seeded jobs data!');
  }
};

// Uncomment this line to run the seeding function
// seedJobs();

export { seedJobs };
