
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Write from "./pages/Write";
import Explore from "./pages/Explore";
import Story from "./pages/Story";
import Profile from "./pages/Profile";
import ReadingLists from "./pages/ReadingLists";
import Trending from "./pages/Trending";
import Popular from "./pages/Popular";
import Contests from "./pages/Contests";
import Communities from "./pages/Communities";
import Authors from "./pages/Authors";
import Fandoms from "./pages/Fandoms";
import ReadingClubs from "./pages/ReadingClubs";
import Support from "./pages/Support";
import Forums from "./pages/Forums";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Updates from "./pages/Updates";
import Community from "./pages/Community";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import WatchStreams from "./pages/WatchStreams";
import Challenges from "./pages/Challenges";
import Marketplace from "./pages/Marketplace";

import "./App.css";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/write" element={<Write />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/story/:id" element={<Story />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reading-lists" element={<ReadingLists />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/community/:id" element={<Community />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/fandoms" element={<Fandoms />} />
        <Route path="/reading-clubs" element={<ReadingClubs />} />
        <Route path="/watch-streams" element={<WatchStreams />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
