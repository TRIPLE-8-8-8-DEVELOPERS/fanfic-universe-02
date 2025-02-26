
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, MessageSquare, Star } from "lucide-react";

interface FeaturedStoryProps {
  id: string;
  title: string;
  author: string;
  authorId: string;
  cover: string;
  genre: string;
  excerpt: string;
  rating: number;
  likes: number;
  comments: number;
  reads: number;
}

const FeaturedStory = ({
  id,
  title,
  author,
  authorId,
  cover,
  genre,
  excerpt,
  rating,
  likes,
  comments,
  reads,
}: FeaturedStoryProps) => {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl group">
      {/* Image with overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <img
        src={cover}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10 lg:p-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge className="bg-primary/80 hover:bg-primary mb-4 backdrop-blur-sm">
              {genre}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-serif"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4"
          >
            <Link
              to={`/author/${authorId}`}
              className="text-white/90 hover:text-white transition-colors text-lg"
            >
              By {author}
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/80 text-base md:text-lg mb-6 line-clamp-3"
          >
            {excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 md:gap-6 text-white/90 mb-6"
          >
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-red-400" />
              <span>{likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>{comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>{reads.toLocaleString()} reads</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to={`/story/${id}`}>
              <Button size="lg" className="rounded-full px-8">
                Read Now
              </Button>
            </Link>
            <Button size="lg" variant="secondary" className="rounded-full px-8">
              Add to Library
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStory;
