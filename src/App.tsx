import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Dashboard from "./pages/Dashboard";
import MainSidebar from "./components/MainSidebar";

import "./App.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen w-full">
      <MainSidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        currentPath={pathname}
      />
      <div className="flex-grow flex flex-col overflow-auto">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout><Index /></AppLayout>} />
        <Route path="/browse" element={<AppLayout><Browse /></AppLayout>} />
        <Route path="/write" element={<AppLayout><Write /></AppLayout>} />
        <Route path="/explore" element={<AppLayout><Explore /></AppLayout>} />
        <Route path="/story/:id" element={<AppLayout><Story /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
        <Route path="/notifications" element={<AppLayout><Notifications /></AppLayout>} />
        <Route path="/reading-lists" element={<AppLayout><ReadingLists /></AppLayout>} />
        <Route path="/trending" element={<AppLayout><Trending /></AppLayout>} />
        <Route path="/popular" element={<AppLayout><Popular /></AppLayout>} />
        <Route path="/contests" element={<AppLayout><Contests /></AppLayout>} />
        <Route path="/communities" element={<AppLayout><Communities /></AppLayout>} />
        <Route path="/community/:id" element={<AppLayout><Community /></AppLayout>} />
        <Route path="/authors" element={<AppLayout><Authors /></AppLayout>} />
        <Route path="/fandoms" element={<AppLayout><Fandoms /></AppLayout>} />
        <Route path="/reading-clubs" element={<AppLayout><ReadingClubs /></AppLayout>} />
        <Route path="/watch-streams" element={<AppLayout><WatchStreams /></AppLayout>} />
        <Route path="/forums" element={<AppLayout><Forums /></AppLayout>} />
        <Route path="/blog" element={<AppLayout><Blog /></AppLayout>} />
        <Route path="/about" element={<AppLayout><AboutUs /></AppLayout>} />
        <Route path="/support" element={<AppLayout><Support /></AppLayout>} />
        <Route path="/privacy" element={<AppLayout><PrivacyPolicy /></AppLayout>} />
        <Route path="/terms" element={<AppLayout><TermsOfService /></AppLayout>} />
        <Route path="/updates" element={<AppLayout><Updates /></AppLayout>} />
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/challenges" element={<AppLayout><Challenges /></AppLayout>} />
        <Route path="/marketplace" element={<AppLayout><Marketplace /></AppLayout>} />
        <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
