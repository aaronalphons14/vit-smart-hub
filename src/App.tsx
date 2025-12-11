import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChargerProvider } from "@/context/ChargerContext";
import { EmergencyStop } from "@/components/EmergencyStop";
import { EmergencyOverlay } from "@/components/EmergencyOverlay";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ChargingMenuPage from "./pages/ChargingMenuPage";
import ActiveChargingPage from "./pages/ActiveChargingPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChargerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <EmergencyOverlay />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/charging" element={<ChargingMenuPage />} />
            <Route path="/charging/active" element={<ActiveChargingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <EmergencyStop />
        </BrowserRouter>
      </ChargerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
