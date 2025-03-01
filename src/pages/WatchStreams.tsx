
import React, { useState } from "react";
import { Search, Filter, Tv, Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WatchStreams = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for streams
  const liveStreams = [
    {
      id: 1,
      title: "Writing Fantasy Worlds Workshop",
      author: "ElvenScribe",
      viewers: 342,
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      tags: ["fantasy", "worldbuilding", "writing-tips"],
    },
    {
      id: 2,
      title: "Character Development Masterclass",
      author: "StoryWeaver",
      viewers: 215,
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      tags: ["characters", "creative-writing", "tutorial"],
    },
    {
      id: 3,
      title: "Live Reading: Crimson Eclipse Chapter 8",
      author: "MidnightAuthor",
      viewers: 523,
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tags: ["live-reading", "vampire", "fanfiction"],
    },
  ];

  const upcomingStreams = [
    {
      id: 4,
      title: "Romance Writing Tips & Tropes",
      author: "HeartfulScribe",
      scheduled: "Tomorrow, 3:00 PM",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      tags: ["romance", "writing-tips", "tropes"],
    },
    {
      id: 5,
      title: "Fan Fiction Writing Marathon",
      author: "FandomQueen",
      scheduled: "Saturday, 10:00 AM",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      tags: ["marathon", "fanfiction", "community"],
    },
  ];

  const recordedStreams = [
    {
      id: 6,
      title: "Sci-Fi World Building",
      author: "CosmicWriter",
      views: 12453,
      recorded: "2 days ago",
      duration: "1:24:36",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tags: ["sci-fi", "worldbuilding", "tutorial"],
    },
    {
      id: 7,
      title: "Plot Twists That Work",
      author: "TwistMaster",
      views: 8921,
      recorded: "1 week ago",
      duration: "58:22",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      tags: ["plot", "writing-tips", "storytelling"],
    },
    {
      id: 8,
      title: "Dialogue Writing Workshop",
      author: "WordSmith",
      views: 6235,
      recorded: "2 weeks ago",
      duration: "1:12:05",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      tags: ["dialogue", "characters", "workshop"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Watch Streams</h1>
            <p className="text-muted-foreground">
              Watch live and recorded streams from your favorite writers and storytellers
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search streams..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="live">
          <TabsList className="mb-6">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              Live Now
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="recorded" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recorded
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      LIVE
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <span className="block h-2 w-2 rounded-full bg-red-500"></span>
                      {stream.viewers} viewers
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1 line-clamp-1">{stream.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {stream.author}</p>
                    <div className="flex flex-wrap gap-1">
                      {stream.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-secondary px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {stream.scheduled}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1 line-clamp-1">{stream.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {stream.author}</p>
                    <div className="flex flex-wrap gap-1">
                      {stream.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-secondary px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        Set Reminder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recorded" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {stream.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1 line-clamp-1">{stream.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">by {stream.author}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {stream.views.toLocaleString()} views • {stream.recorded}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {stream.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-secondary px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default WatchStreams;
