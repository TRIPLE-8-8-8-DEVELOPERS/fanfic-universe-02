
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Browse from "./pages/Browse";
import Explore from "./pages/Explore";
import Write from "./pages/Write";
import Story from "./pages/Story";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Trending from "./pages/Trending";
import Popular from "./pages/Popular";
import NotFound from "./pages/NotFound";
import Communities from "./pages/Communities";
import Community from "./pages/Community";
import Challenges from "./pages/Challenges";
import Contests from "./pages/Contests";
import Support from "./pages/Support";
import ReadingLists from "./pages/ReadingLists";
import ReadingClubs from "./pages/ReadingClubs";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Jobs from "./pages/Jobs";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Authors from "./pages/Authors";
import Fandoms from "./pages/Fandoms";
import Updates from "./pages/Updates";
import Forums from "./pages/Forums";
import WatchStreams from "./pages/WatchStreams";
import { AuthProvider } from "./contexts/AuthContext";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <Router>
            <div className="app-container w-full min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/write" element={<Write />} />
                <Route path="/story/:storyId" element={<Story />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/community/:communityId" element={<Community />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/contests" element={<Contests />} />
                <Route path="/support" element={<Support />} />
                <Route path="/reading-lists" element={<ReadingLists />} />
                <Route path="/reading-clubs" element={<ReadingClubs />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/:conversationId" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:jobId" element={<Story />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/fandoms" element={<Fandoms />} />
                <Route path="/updates" element={<Updates />} />
                <Route path="/forums" element={<Forums />} />
                <Route path="/watch-streams" element={<WatchStreams />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <SonnerToaster richColors position="bottom-right" />
              <Toaster />
            </div>
          </Router>
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
