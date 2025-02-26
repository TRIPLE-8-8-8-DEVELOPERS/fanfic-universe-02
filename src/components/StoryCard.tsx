
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StoryCardProps {
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

const StoryCard = ({
  id,
  title,
  author,
  authorId,
  cover,
  genre,
  excerpt,
  rating,
  likes,
  reads,
}: StoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-[400px] md:h-[450px] rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover image and overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
      <img
        src={cover}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
        <Badge className="mb-2 w-fit backdrop-blur-sm bg-primary/80 hover:bg-primary">
          {genre}
        </Badge>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1 line-clamp-2">
          {title}
        </h3>
        <Link
          to={`/author/${authorId}`}
          className="text-white/80 hover:text-white text-sm mb-2"
        >
          by {author}
        </Link>
        <p className="text-white/70 text-sm line-clamp-2 mb-3">{excerpt}</p>

        {/* Story stats */}
        <div className="flex justify-between items-center text-white/80 text-xs mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-red-400" />
            <span>{likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{reads.toLocaleString()}</span>
          </div>
        </div>

        {/* Call to action */}
        <div
          className={`transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link to={`/story/${id}`}>
            <Button className="w-full rounded-full" size="sm">
              Read Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
