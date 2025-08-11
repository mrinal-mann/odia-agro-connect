import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TopBar from "@/components/TopBar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import GuardedRoute from "@/components/GuardedRoute";
import AuthOTP from "@/components/AuthOTP";
import FarmerDashboard from "@/pages/farmer/Dashboard";
import HubDashboard from "@/pages/hub/Dashboard";
import HubQueue from "@/pages/hub/Queue";
import HubTenders from "@/pages/hub/Tenders";
import BuyerMarket from "@/pages/buyer/Market";
import BuyerOrders from "@/pages/buyer/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <NotificationsProvider>
            <AuthProvider>
              <TopBar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthOTP />} />

                <Route path="/farmer/*" element={<GuardedRoute role="FARMER"><FarmerDashboard /></GuardedRoute>} />

                <Route path="/hub/dashboard" element={<GuardedRoute role="HUB"><HubDashboard /></GuardedRoute>} />
                <Route path="/hub/queue" element={<GuardedRoute role="HUB"><HubQueue /></GuardedRoute>} />
                <Route path="/hub/tenders" element={<GuardedRoute role="HUB"><HubTenders /></GuardedRoute>} />

                <Route path="/buyer/market" element={<GuardedRoute role="BUYER"><BuyerMarket /></GuardedRoute>} />
                <Route path="/buyer/orders" element={<GuardedRoute role="BUYER"><BuyerOrders /></GuardedRoute>} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </NotificationsProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
