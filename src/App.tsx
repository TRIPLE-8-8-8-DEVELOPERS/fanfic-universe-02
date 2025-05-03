
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Auth from "@/pages/Auth";
import Write from "@/pages/Write";
import NotFound from "@/pages/NotFound";
import Browse from "@/pages/Browse";
import Popular from "@/pages/Popular";
import Communities from "@/pages/Communities";
import Jobs from "@/pages/Jobs";
import Profile from "@/pages/Profile";
import ReadingLists from "@/pages/ReadingLists";
import Explore from "@/pages/Explore";
import JobDetails from "@/pages/JobDetails";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "@/components/MainSidebar";
import Header from "@/components/Header";
import { useEffect, lazy, Suspense } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";

// Add lazy-loaded components to improve initial load time
const Story = lazy(() => import("@/pages/Story"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Settings = lazy(() => import("@/pages/Settings"));
const Messages = lazy(() => import("@/pages/Messages"));
const MarketplaceProduct = lazy(() => import("@/pages/MarketplaceProduct"));
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const Fandoms = lazy(() => import("@/pages/Fandoms"));
const Trending = lazy(() => import("@/pages/Trending"));
const Authors = lazy(() => import("@/pages/Authors"));
const Forums = lazy(() => import("@/pages/Forums"));
const Contests = lazy(() => import("@/pages/Contests"));
const ReadingClubs = lazy(() => import("@/pages/ReadingClubs"));
const WatchStreams = lazy(() => import("@/pages/WatchStreams"));
const Updates = lazy(() => import("@/pages/Updates"));
const About = lazy(() => import("@/pages/AboutUs"));
const Support = lazy(() => import("@/pages/Support"));
const Privacy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/TermsOfService"));

// Create a Private Route component to protect authenticated routes
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    toast.error("You must be logged in to access this page");
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Fallback loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner size="lg" />
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <MainSidebar />
            <div className="flex-1 h-screen w-full flex flex-col">
              <Header />
              <ScrollArea className="flex-1 h-full w-full">
                <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/sign-in" element={<SignIn />} />
                      <Route path="/sign-up" element={<SignUp />} />
                      <Route path="/browse" element={<Browse />} />
                      <Route path="/popular" element={<Popular />} />
                      <Route path="/communities" element={<Communities />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/jobs/:id" element={<JobDetails />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/story/:id" element={<Story />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/marketplace/product/:id" element={<MarketplaceProduct />} />
                      <Route path="/fandoms" element={<Fandoms />} />
                      <Route path="/trending" element={<Trending />} />
                      <Route path="/authors" element={<Authors />} />
                      <Route path="/forums" element={<Forums />} />
                      <Route path="/contests" element={<Contests />} />
                      <Route path="/reading-clubs" element={<ReadingClubs />} />
                      <Route path="/watch-streams" element={<WatchStreams />} />
                      <Route path="/updates" element={<Updates />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/profile/:username" element={<Profile />} />
                      
                      {/* Protected routes */}
                      <Route path="/write" element={
                        <PrivateRoute><Write /></PrivateRoute>
                      } />
                      <Route path="/profile" element={
                        <PrivateRoute><Profile /></PrivateRoute>
                      } />
                      <Route path="/dashboard" element={
                        <PrivateRoute><Dashboard /></PrivateRoute>
                      } />
                      <Route path="/settings" element={
                        <PrivateRoute><Settings /></PrivateRoute>
                      } />
                      <Route path="/messages" element={
                        <PrivateRoute><Messages /></PrivateRoute>
                      } />
                      <Route path="/reading-lists" element={
                        <PrivateRoute><ReadingLists /></PrivateRoute>
                      } />
                      
                      {/* Fallback route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
              </ScrollArea>
            </div>
          </div>
          <Toaster />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
