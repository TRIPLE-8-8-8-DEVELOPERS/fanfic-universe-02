
import { supabase } from "../integrations/supabase/client";
import { mockJobs } from "../data/mockJobsData";

const seedJobs = async () => {
  // Convert string dates to proper timestamp objects
  const processedJobs = mockJobs.map(job => {
    // For demo purposes, set deadlines in the future
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 30); // 30 days from now
    
    return {
      ...job,
      deadline,
      posted: new Date(), // Current timestamp
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
