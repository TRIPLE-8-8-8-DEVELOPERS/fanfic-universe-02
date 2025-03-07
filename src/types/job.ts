
export interface JobType {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "freelance" | "remote";
  category: "writing" | "editing" | "marketing" | "design" | "development" | "community" | "content" | "other";
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  posted: string;
  deadline: string;
  logo: string;
  featured?: boolean;
  tags?: string[];
}
