/* client/src/App.tsx */
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Explicit Page Imports
import Home from "./pages/Home";
import TheHow from "./pages/TheHow"; // Points to client/src/pages/TheHow.tsx
import IngredientPage from "./pages/IngredientPage";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/the-how" component={TheHow} />
      <Route path="/ingredients/:id" component={IngredientPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;