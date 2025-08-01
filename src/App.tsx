
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProveedorCarrito } from "./contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminMessages from "./pages/AdminMessages";
import ProductInfo from "./pages/ProductInfo";
import ProductCatalog from "./pages/ProductCatalog";
import Checkout from "./pages/Checkout";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import ProductTracking from "./pages/ProductTracking";
import TicketSupport from "./pages/TicketSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProveedorCarrito>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/messages" element={<AdminMessages />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/product/:slug" element={<ProductInfo />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            <Route path="/tracking" element={<ProductTracking />} />
            <Route path="/tickets" element={<TicketSupport />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProveedorCarrito>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
