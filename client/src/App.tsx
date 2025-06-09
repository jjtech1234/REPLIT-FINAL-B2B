import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import FranchiseDetails from "@/pages/franchise-details";
import SellBusiness from "@/pages/sell-business";
import PostAd from "@/pages/post-ad";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import About from "@/pages/about";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/franchise/:id" component={FranchiseDetails} />
      <Route path="/sell-business" component={SellBusiness} />
      <Route path="/post-ad" component={PostAd} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
