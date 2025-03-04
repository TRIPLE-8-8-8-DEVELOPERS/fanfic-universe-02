
import { motion } from "framer-motion";
import StoryCard from "./StoryCard";

interface Story {
  id: string;
  title: string;
  author: string;
  authorId: string;
  cover: string;
  genre: string;
  excerpt: string;
  rating: number;
  likes: number;
  reads: number;
}

interface StoryGridProps {
  title: string;
  description?: string;
  stories: Story[];
  category?: string; // Added to support the category prop
}

const StoryGrid = ({ title, description, stories, category }: StoryGridProps) => {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-serif">{title}</h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl">{description}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StoryCard {...story} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryGrid;
