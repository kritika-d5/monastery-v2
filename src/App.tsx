import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ExploreVirtual from "./pages/ExploreVirtual";
import JourneyPlanner from "./pages/JourneyPlanner";
import DigitalArchive from "./pages/DigitalArchive";
import AdminDashboard from "./pages/AdminDashboard";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background font-inter">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/explore" element={<ExploreVirtual />} />
            <Route path="/journey-planner" element={<JourneyPlanner />} />
            <Route path="/digital-archive" element={<DigitalArchive />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
