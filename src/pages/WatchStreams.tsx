import React, { useState } from "react";
import { Search, Filter, Tv, Calendar, Clock, MessageCircle, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";

const WatchStreams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { user: "ElvenScribe", message: "Welcome to the stream!" },
    { user: "StoryWeaver", message: "Excited to learn about character development!" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { user: "You", message: newMessage }]);
      setNewMessage("");
    }
  };

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
      <main className="flex-1 container py-8 bg-black bg-opacity-90 rounded-lg shadow-lg text-white animate-slide-up">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Watch Streams
            </h1>
            <p className="text-lg text-gray-300">
              Watch live and recorded streams from your favorite writers and storytellers
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto animate-fade-in">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
              <Input
                placeholder="Search streams..."
                className="pl-10 rounded-full border-2 border-blue-300 focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="border-blue-500 text-blue-500 hover:bg-blue-100">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="live">
          <TabsList className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-1 animate-fade-in">
            <TabsTrigger value="live" className="flex items-center gap-2 px-4 py-2 rounded-full">
              <Tv className="h-5 w-5" />
              Live Now
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2 px-4 py-2 rounded-full">
              <Calendar className="h-5 w-5" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="recorded" className="flex items-center gap-2 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5" />
              Recorded
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden shadow-lg rounded-lg animate-scale-in">
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
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
                    <h3 className="font-bold mb-1 line-clamp-1 text-blue-600">
                      {stream.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">by {stream.author}</p>
                    <div className="flex flex-wrap gap-1">
                      {stream.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Chat Section */}
            <div className="mt-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Live Chat</h2>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-800 shadow-inner">
                {chatMessages.map((chat, index) => (
                  <div key={index} className="mb-2">
                    <strong className="text-blue-600">{chat.user}:</strong> <span>{chat.message}</span>
                  </div>
                ))}
              </div>
              <div className="flex mt-4 gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 rounded-full border-2 border-blue-300 focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleSendMessage} variant="default" className="bg-blue-500 text-white rounded-full">
                  Send
                </Button>
              </div>
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
                    <p className="text-sm text-gray-300 mb-2">by {stream.author}</p>
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
                    <p className="text-sm text-gray-300 mb-1">by {stream.author}</p>
                    <p className="text-xs text-gray-400 mb-2">
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

        {/* Monetization Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Support Your Favorite Streamers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-4 shadow-lg border-t-4 border-blue-500">
              <h3 className="font-bold mb-2 text-blue-600">Subscribe</h3>
              <p className="text-sm text-gray-300 mb-4">
                Get exclusive perks and support the streamer by subscribing.
              </p>
              <Button variant="default" className="bg-blue-500 text-white rounded-full">
                Subscribe Now
              </Button>
            </Card>
            <Card className="p-4 shadow-lg border-t-4 border-green-500">
              <h3 className="font-bold mb-2 text-green-600">Donate</h3>
              <p className="text-sm text-gray-300 mb-4">
                Help the streamer achieve their goals with a donation.
              </p>
              <Button variant="default" className="bg-green-500 text-white rounded-full">
                Donate
              </Button>
            </Card>
            <Card className="p-4 shadow-lg border-t-4 border-purple-500">
              <h3 className="font-bold mb-2 text-purple-600">Merchandise</h3>
              <p className="text-sm text-gray-300 mb-4">
                Check out exclusive merchandise from your favorite streamers.
              </p>
              <Button variant="default" className="bg-purple-500 text-white rounded-full">
                Shop Now
              </Button>
            </Card>
            <Card className="p-4 shadow-lg border-t-4 border-blue-500">
              <h3 className="font-bold mb-2 text-blue-600">Exclusive Content</h3>
              <p className="text-sm text-gray-300 mb-4">
                Unlock premium videos, behind-the-scenes content, and more.
              </p>
              <Button variant="default" className="bg-blue-500 text-white rounded-full">
                Unlock Content
              </Button>
            </Card>
            <Card className="p-4 shadow-lg border-t-4 border-green-500">
              <h3 className="font-bold mb-2 text-green-600">Sponsorships</h3>
              <p className="text-sm text-gray-300 mb-4">
                Partner with streamers to promote your brand or product.
              </p>
              <Button variant="default" className="bg-green-500 text-white rounded-full">
                Become a Sponsor
              </Button>
            </Card>
            <Card className="p-4 shadow-lg border-t-4 border-purple-500">
              <h3 className="font-bold mb-2 text-purple-600">Custom Rewards</h3>
              <p className="text-sm text-gray-300 mb-4">
                Redeem points for shoutouts, Q&A sessions, or personalized messages.
              </p>
              <Button variant="default" className="bg-purple-500 text-white rounded-full">
                Redeem Rewards
              </Button>
            </Card>
          </div>
        </div>

        {/* Crowdfunding Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Crowdfunding Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-4 shadow-lg border-t-4 border-blue-500">
              <h3 className="font-bold mb-2 text-blue-600">New Streaming Equipment</h3>
              <p className="text-sm text-gray-300 mb-4">
                Help the streamer upgrade their setup for better quality streams.
              </p>
              <Button variant="default" className="bg-blue-500 text-white rounded-full">
                Contribute
              </Button>
            </Card>
            <Card className="p-4 shadow-lg border-t-4 border-green-500">
              <h3 className="font-bold mb-2 text-green-600">Charity Fundraiser</h3>
              <p className="text-sm text-gray-300 mb-4">
                Support a cause the streamer is passionate about.
              </p>
              <Button variant="default" className="bg-green-500 text-white rounded-full">
                Donate to Charity
              </Button>
            </Card>
            <Card className="p-4 shadow-lg border-t-4 border-purple-500">
              <h3 className="font-bold mb-2 text-purple-600">Community Events</h3>
              <p className="text-sm text-gray-300 mb-4">
                Fund special events like writing marathons or fan meetups.
              </p>
              <Button variant="default" className="bg-purple-500 text-white rounded-full">
                Support Events
              </Button>
            </Card>
          </div>
        </div>

        {/* Sponsored Streams Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Sponsored Streams</h2>
          <p className="text-sm text-gray-300 mb-4">
            Watch streams brought to you by our sponsors and partners.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-4">
              <h3 className="font-bold mb-2">Fantasy Writing Workshop</h3>
              <p className="text-sm text-gray-300 mb-4">
                Sponsored by Worldbuilders Inc.
              </p>
              <Button variant="default">Learn More</Button>
            </Card>
            <Card className="p-4">
              <h3 className="font-bold mb-2">Sci-Fi Storytelling Tips</h3>
              <p className="text-sm text-gray-300 mb-4">
                Sponsored by Galactic Creators.
              </p>
              <Button variant="default">Learn More</Button>
            </Card>
          </div>
        </div>

      </main>
  );
};

export default WatchStreams;
