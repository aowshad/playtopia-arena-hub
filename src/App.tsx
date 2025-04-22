
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FieldBooking from "./pages/FieldBooking";
import TeamManagement from "./pages/TeamManagement";
import Tournaments from "./pages/Tournaments";
import Profile from "./pages/Profile";
import TournamentsRegisterTeam from "./pages/TournamentsRegisterTeam";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminFieldManagement from "./pages/admin/AdminFieldManagement";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminTournamentManagement from "./pages/admin/AdminTournamentManagement";
import AdminPaymentVerification from "./pages/admin/AdminPaymentVerification";
import AdminGameRequestManagement from "./pages/admin/AdminGameRequestManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* User Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fields" element={<FieldBooking />} />
          <Route path="/teams" element={<TeamManagement />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tournaments/:tournamentId/register" element={<TournamentsRegisterTeam />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/fields" element={<AdminFieldManagement />} />
          <Route path="/admin/users" element={<AdminUserManagement />} />
          <Route path="/admin/tournaments" element={<AdminTournamentManagement />} />
          <Route path="/admin/payments" element={<AdminPaymentVerification />} />
          <Route path="/admin/game-requests" element={<AdminGameRequestManagement />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
