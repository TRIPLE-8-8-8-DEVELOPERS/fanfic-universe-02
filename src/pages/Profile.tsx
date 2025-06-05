import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Calendar, 
  Heart, 
  MessageSquare, 
  BookOpen, 
  PenTool, 
  Award, 
  Users, 
  MessageCircle, 
  Edit, 
  AlertCircle,
  User,
  ExternalLink
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

// Define story card component props type to match StoryCard requirements
type ReadingListStory = {
  id: string;
  title: string;
  excerpt: string;
  cover: string | null;
  author: string;
  authorId: string;
  genre: string; // Make genre required, not optional
  rating: number;
  likes: number;
  reads: number;
};

const StoryPlaceholder = () => (
  <div className="border border-border rounded-lg overflow-hidden">
    <div className="aspect-[3/2] bg-muted w-full"></div>
    <div className="p-4 space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  </div>
);

const Profile = () => {
  const { username: usernameParam } = useParams();
  const navigate = useNavigate();
  const { user, profile: currentUserProfile, isAuthenticated, isLoading: authLoading } = useAuth();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  
  // If no username is provided in the URL, use the current user's profile
  const isOwnProfile = !usernameParam;
  
  // Fetch profile data of the user whose profile we're viewing
  console.log("Before profile query:");
  console.log("authLoading:", authLoading);
  console.log("isOwnProfile:", isOwnProfile);
  console.log("currentUserProfile?.username:", currentUserProfile?.username);
  console.log("usernameParam:", usernameParam);
  const { data: profileData, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['profile', usernameParam || currentUserProfile?.username || user?.id],
    queryFn: async () => {
      if (isOwnProfile) {
        return currentUserProfile;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', usernameParam || user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      return data;
    },
    enabled: !authLoading && !!(usernameParam || currentUserProfile?.username || user?.id),
  });
  console.log("profile query enabled:", !authLoading && (isOwnProfile ? !!(currentUserProfile?.username) : !!usernameParam));
  // Fetch user's stories
  const { data: userStories, isLoading: storiesLoading } = useQuery({
    queryKey: ['userStories', profileData?.id],
    queryFn: async () => {
      console.log("Fetching user stories...");
      // Log the profile data ID
      console.log("Profile: profileData?.id:", profileData?.id);
      if (!profileData?.id) return [];
      
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('author_id', profileData.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching stories:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!profileData?.id,
  });
  console.log("userStories query enabled:", !!profileData?.id);
  
  // Fetch user's reading list
  const { data: readingList, isLoading: readingListLoading } = useQuery({
    queryKey: ['readingList', profileData?.id],
    queryFn: async () => {
      console.log("Fetching reading list...");
      if (!profileData?.id) return [];
      
      // Get the user's reading lists
      const { data: lists, error: listsError } = await supabase
        .from('reading_lists')
        .select('*')
        .eq('user_id', profileData.id)
        .eq('name', 'Reading List') // Default reading list
        .single();
        
      if (listsError) {
        console.error('Error fetching reading lists:', listsError);
        return [];
      }
      
      if (!lists) return [];
      
      // Get the items in the reading list
      const { data: items, error: itemsError } = await supabase
        .from('reading_list_items')
        .select(`
          id,
          story_id,
          stories (
            id, 
            title, 
            summary,
            cover_image,
            author_id,
            profiles:author_id (username, display_name)
          )
        `)
        .eq('reading_list_id', lists.id);
        
      if (itemsError) {
        console.error('Error fetching reading list items:', itemsError);
        return [];
      }
      
      // Transform the nested data to include required StoryCard props
      return items.map(item => ({
        id: item.story_id,
        title: item.stories.title,
        excerpt: item.stories.summary,
        cover: item.stories.cover_image,
        author: item.stories.profiles.display_name,
        authorId: item.stories.author_id,
        genre: "Fiction", // Provide a default non-optional value for genre
        rating: 0,
        likes: 0,
        reads: 0
      })) || [];
    },
    enabled: !!profileData?.id,
  });
  console.log("readingList query enabled:", !!profileData?.id);
  
  // Calculate user stats
  const userStats = {
    stories: userStories?.length || 0,
    likes: 0, // This would need a query to count likes
    comments: 0, // This would need a query to count comments
    reads: 0, // This would need a query to count reads
  };
  
  useEffect(() => {
    // Scroll to top when page loads or profile changes
    window.scrollTo(0, 0);
  }, [usernameParam]);
  
  useEffect(() => {
    // If trying to access own profile but not authenticated, redirect to auth
    if (isOwnProfile && !authLoading && !isAuthenticated) {
      toast.error("You must be logged in to view your profile");
      navigate("/auth", { replace: true });
    }
  }, [isOwnProfile, authLoading, isAuthenticated, navigate]);
  
  // Handle profile not found
  if (profileError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Profile not found</h2>
            <p className="text-muted-foreground mb-6">
              The profile you're looking for doesn't seem to exist or has been removed.
            </p>
            <Link to="/">
              <Button>Return to Homepage</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show loading state
  if ((isOwnProfile && authLoading) || profileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow pt-24">
          <section className="bg-secondary py-12">
            <div className="container">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:sticky md:top-32">
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-32 w-32 rounded-full" />
                    <div className="flex gap-2 mt-4">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <Skeleton className="h-8 w-1/3 mb-2" />
                  <Skeleton className="h-5 w-1/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex gap-4 mb-6">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Skeleton className="h-24 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Extract profile info for display
  const displayName = profileData?.display_name || profileData?.username || 'Anonymous';
  const userUsername = profileData?.username || '';
  const bio = profileData?.bio || 'No bio provided yet.';
  const website = profileData?.website;
  const avatarUrl = profileData?.avatar_url;
  const createdAt = profileData?.created_at ? format(new Date(profileData.created_at), 'MMMM yyyy') : '';
  
  // For now, these are placeholder badges
  const badges = [
    { name: "New Member", description: "Joined the platform" },
  ];
  
  if (userStats.stories >= 5) {
    badges.push({ name: "Writer", description: "Published 5+ stories" });
  }
  
  if (userStats.stories >= 10) {
    badges.push({ name: "Prolific Writer", description: "Published 10+ stories" });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Profile Header */}
        <section className="bg-secondary py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar and Follow Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:sticky md:top-32"
              >
                <div className="flex flex-col items-center">
                  <Avatar className="h-28 w-28 md:h-32 md:w-32 mb-4">
                    <AvatarImage src={avatarUrl} alt={displayName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {displayName?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2 mb-4">
                    {isOwnProfile ? (
                      <Button 
                        className="rounded-full px-6" 
                        onClick={() => setEditProfileOpen(true)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button className="rounded-full px-6">Follow</Button>
                        <Link to={`/messages/${userUsername}`}>
                          <Button variant="outline" className="rounded-full" size="icon">
                            <MessageCircle size={18} />
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-center">
                    <div>
                      <div className="font-bold">0</div>
                      <div className="text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="font-bold">0</div>
                      <div className="text-muted-foreground">Following</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <h1 className="text-3xl font-bold mb-1">{displayName}</h1>
                <p className="text-muted-foreground mb-4">@{userUsername}</p>
                <p className="mb-4">{bio}</p>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground mb-6">
                  {website && (
                    <a 
                      href={website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                  {createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {createdAt}
                    </div>
                  )}
                </div>

                {/* Author Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-background rounded-lg p-4 text-center">
                    <PenTool className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-2xl font-bold">{userStats.stories}</div>
                    <div className="text-xs text-muted-foreground">Stories</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <Heart className="h-5 w-5 mx-auto mb-1 text-red-400" />
                    <div className="text-2xl font-bold">{userStats.likes.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <MessageSquare className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-2xl font-bold">{userStats.comments.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <BookOpen className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-2xl font-bold">{userStats.reads.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Reads</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {badges.map((badge) => (
                      <div
                        key={badge.name}
                        className="group relative inline-block"
                      >
                        <Badge className="flex items-center gap-1.5 py-1.5">
                          <Award className="h-3.5 w-3.5" /> {badge.name}
                        </Badge>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs rounded-md p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-48 text-center z-50">
                          {badge.description}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-popover"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Profile Tabs */}
        <section className="py-12">
          <div className="container">
            <Tabs defaultValue="stories" className="w-full">
              <TabsList className="w-full justify-start mb-8 rounded-full">
                <TabsTrigger value="stories" className="rounded-full">
                  {isOwnProfile ? "My Stories" : "Stories"}
                </TabsTrigger>
                <TabsTrigger value="reading-list" className="rounded-full">
                  Reading List
                </TabsTrigger>
                <TabsTrigger value="favorites" className="rounded-full">
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-full">
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stories" className="mt-0">
                {storiesLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                      <StoryPlaceholder key={index} />
                    ))}
                  </div>
                ) : userStories?.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {userStories.map((story, index) => (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <StoryCard 
                          id={story.id}
                          title={story.title}
                          author={displayName}
                          authorId={story.author_id}
                          cover={story.cover_image}
                          genre=""
                          excerpt={story.summary}
                          rating={0}
                          likes={0}
                          reads={0}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-muted rounded-lg">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                      <PenTool className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No stories yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      {isOwnProfile 
                        ? "You haven't written any stories yet. Start writing your first story now!"
                        : "This user hasn't written any stories yet."}
                    </p>
                    {isOwnProfile && (
                      <Link to="/write">
                        <Button className="rounded-full px-8">Start Writing</Button>
                      </Link>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reading-list" className="mt-0">
                {readingListLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                      <StoryPlaceholder key={index} />
                    ))}
                  </div>
                ) : readingList?.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {readingList.map((story, index) => (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <StoryCard {...story} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-muted rounded-lg">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Reading list is empty</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      {isOwnProfile 
                        ? "You haven't added any stories to your reading list yet."
                        : "This user hasn't added any stories to their reading list yet."}
                    </p>
                    <Link to="/browse">
                      <Button className="rounded-full px-8">Browse Stories</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="favorites" className="mt-0">
                <div className="p-12 text-center bg-muted rounded-lg">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    {isOwnProfile 
                      ? "When you find stories you love, heart them to add them to your favorites collection."
                      : "This user hasn't added any stories to their favorites yet."}
                  </p>
                  <Link to="/browse">
                    <Button className="rounded-full px-8">Browse Stories</Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="p-12 text-center bg-muted rounded-lg">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No recent activity</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    {isOwnProfile
                      ? "Your activity feed shows your interactions with stories and other writers in the community."
                      : "This user hasn't had any recent activity."}
                  </p>
                  <Link to="/community">
                    <Button className="rounded-full px-8">Explore Community</Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileForm 
          open={editProfileOpen} 
          onOpenChange={setEditProfileOpen} 
        />
      )}

      <Footer />
    </div>
  );
};

export default Profile;
