
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Story from "./pages/Story";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Browse from "./pages/Browse";
import Write from "./pages/Write";
import Community from "./pages/Community";
import Explore from "./pages/Explore";
import Authors from "./pages/Authors";
import Fandoms from "./pages/Fandoms";
import Updates from "./pages/Updates";
import Forums from "./pages/Forums";
import Contests from "./pages/Contests";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          {/* Discover Section */}
          <Route path="/browse" element={<Browse />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/fandoms" element={<Fandoms />} />
          <Route path="/updates" element={<Updates />} />
          
          {/* Create Section */}
          <Route path="/write" element={<Write />} />
          
          {/* Community Section */}
          <Route path="/community" element={<Community />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/contests" element={<Contests />} />
          
          {/* Company Pages */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
