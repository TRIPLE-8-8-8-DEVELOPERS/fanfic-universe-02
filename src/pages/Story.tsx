
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock story data
const story = {
  id: "1",
  title: "The Dragon's Prophecy",
  author: "Eleanor Williams",
  authorId: "eleanor",
  authorAvatar: "https://i.pravatar.cc/150?img=29",
  cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
  banner: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
  genre: "Fantasy",
  tags: ["Dragons", "Magic", "Adventure", "Medieval"],
  summary:
    "When the ancient prophecy of the Dragon's Return begins to unfold, Lyra finds herself at the center of a thousand-year-old mystery that could either save her kingdom or destroy it completely.",
  publishedAt: "2023-09-15T12:00:00Z",
  updatedAt: "2023-10-20T09:30:00Z",
  status: "In Progress",
  chapters: 12,
  currentChapter: 1,
  rating: 4.8,
  likes: 12503,
  comments: 842,
  reads: 89752,
  wordCount: 45672,
  readingTime: 182, // in minutes
  content: `
    <p>The ancient towers of Eldoria rose against the crimson sky, their weathered stones bearing silent witness to a thousand years of peace. But tonight, something was different. A tension hung in the air, thick and foreboding, like the calm before a devastating storm.</p>

    <p>Lyra Nightshade stood at her bedroom window, watching as dark clouds gathered on the horizon. The wind carried whispers — old words in forgotten tongues — that seemed to call her name. She'd been having the dreams again. Dreams of fire and flight, of scaled wings stretching across the moon and eyes that burned like molten gold.</p>

    <p>"The dragons are coming back," she whispered to herself, her fingers tracing the small birthmark on her wrist — a perfect crescent moon that seemed to shimmer in the fading light.</p>

    <p>According to the ancient texts hidden deep in the royal library, the last dragon had vanished five centuries ago, disappearing after the cataclysmic Battle of Ashen Fields. But the prophecy spoke of their return when the bloodline of the Starborn aligned with the celestial convergence — a rare astronomical event that happened once every thousand years.</p>

    <p>And according to Master Thorne, the royal astronomer, that convergence would happen tonight.</p>

    <p>A sharp knock on her chamber door startled Lyra from her thoughts. Without waiting for an answer, her younger brother Finn burst in, his face flushed with excitement.</p>

    <p>"Lyra! You need to come quickly. Father has called an emergency council meeting, and he specifically asked for you to attend."</p>

    <p>Lyra frowned. As the second child of King Orion, she was rarely included in matters of state. That privilege was reserved for her older sister, Elara, the crown princess and heir to the throne of Eldoria.</p>

    <p>"Are you certain he asked for me?" she questioned, already reaching for her formal robe — midnight blue velvet embroidered with silver constellations, a gift from her mother before she passed.</p>

    <p>"Yes, absolutely. He said it concerns the ancient scrolls you've been studying, something about a prophecy and stars aligning." Finn's eyes were wide. At fourteen, three years her junior, he still possessed an innocence that Lyra sometimes envied.</p>

    <p>Lyra's heart raced as she followed her brother through the winding corridors of the castle. The ancient prophecy she'd discovered in texts so old they nearly crumbled at her touch... could it be coming true?</p>

    <p><em>"When the three moons align and the Starborn awakens, the dragons shall return. Fire and blood will cleanse the realm, and the true heir will rise from ashes to reclaim what was lost."</em></p>

    <p>The council chamber doors loomed ahead, heavy oak carved with the history of their kingdom. Two royal guards stood at attention, their silver armor gleaming in the torchlight. They bowed slightly as Lyra approached, then pulled open the massive doors.</p>

    <p>Inside, the circular chamber buzzed with tense conversation. Her father, King Orion, sat at the head of the great table, his face grave. Beside him, Princess Elara looked annoyed, while the various ministers, nobles, and military commanders argued among themselves.</p>

    <p>The room fell silent as Lyra entered. All eyes turned to her — some curious, others suspicious. Her father gestured for her to approach.</p>

    <p>"Lyra," King Orion's voice was weary. "Tell the council what you told me about the Draconic Prophecy."</p>

    <p>Lyra swallowed hard, suddenly aware of the weight of the moment. "The prophecy speaks of the dragons' return during the Celestial Convergence, when all three moons align perfectly with the Dragon's Star. According to my calculations and Master Thorne's astronomical charts, that convergence begins tonight at midnight."</p>

    <p>Murmurs spread through the council. Lord Blackthorn, the king's most trusted adviser, scoffed loudly. "Surely we aren't basing kingdom security on children's fables and star-gazing?"</p>

    <p>"These are not mere fables," Lyra countered, lifting her chin. "The historical records clearly document the existence of dragons and their connection to the royal bloodline. The prophecy was written by Queen Lyanna herself, the founder of our dynasty."</p>

    <p>"And what exactly does this prophecy predict?" questioned General Darius, commander of the royal army.</p>

    <p>Lyra hesitated, knowing how ominous the words sounded. "It says that the dragons will return to choose a worthy ruler — one with the blood of the Starborn — who will face a great darkness threatening to consume the realm."</p>

    <p>"Preposterous!" Lord Blackthorn slammed his fist on the table. "This girl fills her head with ancient stories instead of practical matters of court. Your Majesty, we should be focusing on the growing tensions with Westmarch, not chasing fairy tales."</p>

    <p>King Orion raised a hand for silence. "I would normally agree, old friend. But there have been... incidents. Reports from the northern villages of strange lights in the sky. Animals fleeing from the forests. And this morning, our scouts found this."</p>

    <p>He nodded to General Darius, who placed an object on the table. It was a scale — larger than a dinner plate, iridescent black that seemed to shimmer with hints of deep purple and blue.</p>

    <p>Lyra's breath caught in her throat. She reached out, her fingers hovering over the scale without touching it. "Dragon scale," she whispered.</p>

    <p>"Impossible," Elara spoke for the first time, her voice sharp. "Dragons are extinct."</p>

    <p>"Then how do you explain this?" the king challenged. No one had an answer.</p>

    <p>"There's more to the prophecy," Lyra said quietly. All eyes returned to her. "It says that when the dragons return, they will seek the one who carries their mark — the Starborn heir whose blood can awaken their ancient magic."</p>

    <p>Slowly, deliberately, Lyra pushed back her sleeve, revealing the crescent birthmark on her wrist. In the council chamber's light, it seemed to glow with an inner radiance.</p>

    <p>"The mark of the Starborn," gasped Master Thorne.</p>

    <p>King Orion's face paled as he looked at his daughter with new eyes — not as a king regarding a subject, but as a father facing an impossible truth.</p>

    <p>"According to the prophecy," Lyra continued, her voice gaining strength, "the dragons will call to the Starborn, and together they will either save the kingdom from darkness... or be consumed by it."</p>

    <p>As if summoned by her words, a distant roar echoed across the night sky, so powerful it made the castle walls tremble. The sound was unlike anything anyone had ever heard — ancient, primal, and unmistakably not of their world.</p>

    <p>Through the high windows of the council chamber, they could see the three moons beginning to align, forming a perfect arc across the night sky.</p>

    <p>"It has begun," Lyra whispered.</p>
  `,
};

const Story = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const formattedDate = new Date(story.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const incrementFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  const decrementFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[30vh] md:h-[40vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src={story.banner}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-end">
            <div className="container py-8">
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-4 text-sm transition-colors"
              >
                <ChevronLeft className="h-4 w-4" /> Back to Home
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold font-serif mb-2">
                {story.title}
              </h1>
              <div className="flex items-center text-white/80 text-sm">
                <span>Chapter {story.currentChapter}</span>
                <span className="mx-2">•</span>
                <span>Published {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="sticky top-24 space-y-8">
                {/* Author */}
                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={story.authorAvatar} alt={story.author} />
                      <AvatarFallback>
                        {story.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">By {story.author}</h3>
                      <Link
                        to={`/author/${story.authorId}`}
                        className="text-sm text-primary hover:underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                  <Button className="w-full rounded-full">Follow Author</Button>
                </div>

                {/* Story Info */}
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="font-medium mb-4">Story Info</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="outline">{story.status}</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Chapters</span>
                      <span>{story.chapters}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Words</span>
                      <span>{story.wordCount.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Reading Time</span>
                      <span>{Math.ceil(story.readingTime / 60)} hrs</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-400" />{" "}
                        {story.rating.toFixed(1)}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Tags */}
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="font-medium mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-9"
            >
              {/* Reading Controls */}
              <div className="mb-6 flex justify-between items-center sticky top-[70px] z-40 bg-background/80 backdrop-blur-sm p-3 rounded-lg border">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={decrementFontSize}
                  >
                    <span className="text-sm">A-</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={incrementFontSize}
                  >
                    <span className="text-sm">A+</span>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={isLiked ? "default" : "ghost"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button
                    variant={isBookmarked ? "default" : "ghost"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark
                      className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Story Content */}
              <div
                className="prose prose-lg max-w-none dark:prose-invert"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: story.content }}
              />

              {/* Chapter Navigation */}
              <div className="mt-12 flex justify-between">
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={story.currentChapter <= 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" /> Previous Chapter
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={story.currentChapter >= story.chapters}
                >
                  Next Chapter <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Comments Section */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-6 font-serif">
                  Comments ({story.comments})
                </h3>
                <div className="p-8 text-center bg-secondary rounded-xl">
                  <h4 className="text-lg font-medium mb-2">
                    Join the conversation
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Sign in to leave comments and interact with the author
                  </p>
                  <Link to="/sign-in">
                    <Button className="rounded-full px-8">Sign In</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Story;
