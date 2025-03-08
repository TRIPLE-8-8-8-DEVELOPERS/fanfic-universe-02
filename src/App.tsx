
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "@/components/MainSidebar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <MainSidebar />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/write" element={<Write />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/reading-lists" element={<ReadingLists />} />
                <Route path="/explore" element={<Explore />} />
                {/* Add all your other routes here */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Toaster />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
