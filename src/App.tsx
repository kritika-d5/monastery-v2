import React from 'react';
import '@/lib/i18n';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";

// Page Imports
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ExploreVirtual from "@/pages/ExploreVirtual";
import JourneyPlanner from "@/pages/JourneyPlanner";
import DigitalArchive from "@/pages/DigitalArchive";
import AdminDashboard from "@/pages/AdminDashboard";
import RumtekMonasteryPage from "@/pages/monasteries/Rumtek";
import AboutSikkim from "@/pages/AboutSikkim";
import CommunityPage from "@/pages/Community";
import ManuscriptDetail from "@/pages/ManuscriptDetail";
import ProfilePage from '@/pages/Profile';
import TravelCompanion from '@/pages/TravelCompanion';

// Route Protection Import
import AdminRouteGuard from '@/components/AdminRouteGuard';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background font-inter">
            <Navigation />
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<Index />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/virtual-tours" element={<ExploreVirtual />} />
              <Route path="/virtual-tours/rumtek" element={<RumtekMonasteryPage />} />
              <Route path="/journey-planner" element={<JourneyPlanner />} />
              <Route path="/digital-archive" element={<DigitalArchive />} />
              <Route path="/digital-archive/:manuscriptId" element={<ManuscriptDetail />} />
              <Route path="/about-sikkim" element={<AboutSikkim />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/travel-companion" element={<TravelCompanion />} />

              {/* --- Protected Admin Route --- */}
              {/* This new route group uses the AdminRouteGuard. Any route nested
                  inside it will be protected and require the user to be an admin. */}
              <Route element={<AdminRouteGuard />}>
                <Route path="/admin" element={<AdminDashboard />} />
                {/* You can add more admin-only routes here in the future */}
              </Route>
              
              {/* --- Catch-all Not Found Route --- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;