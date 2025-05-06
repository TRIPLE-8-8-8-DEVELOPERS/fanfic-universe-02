
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";
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
import { AuthProvider } from "./contexts/AuthContext";

// Import other page components for future routing

function App() {
  return (
    <AuthProvider>
      <Router>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
