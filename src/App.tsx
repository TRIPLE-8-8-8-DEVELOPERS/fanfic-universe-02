import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import MainSidebar from "@/components/MainSidebar"; // ✅ Re-add this

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Browse from "./pages/Browse";
import Explore from "./pages/Explore";
import Write from "./pages/Write";
import Story from "./pages/Story";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
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

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthProvider>
          <SidebarProvider>
            <Router>
              <div className="w-full h-screen flex overflow-hidden">
                {/* ✅ Only one sidebar here */}
                <MainSidebar />
                
                {/* Main content area */}
                <div className="flex-1 h-full overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/search" element={<Search />} />
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
                    <Route path="/jobs/:jobId" element={<Story />} /> {/* Consider using a separate component for job details */}
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
                </div>

                {/* Toasts */}
                <SonnerToaster richColors position="bottom-right" />
                <Toaster />
              </div>
            </Router>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
