/* client/src/App.tsx */
import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Explicit Page Imports
import Home from "./pages/Home";
import TheHow from "./pages/TheHow";
import Ingredients from "./pages/Ingredients";
import IngredientPage from "./pages/IngredientPage";
import PreorderPage from "./pages/PreorderPage";
import OurPromise from "./pages/OurPromise";
import NotFound from "./pages/not-found";

const Showcase = lazy(() => import("./pages/Showcase"));

/**
 * ScrollToTop — fires on every route change to bring the user to the top
 * of the new page. Without this, wouter's client-side navigation preserves
 * the previous scroll position, which is jarring when jumping between pages.
 * Hash anchors (e.g., /#story) are preserved — only path changes trigger
 * the scroll.
 */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    // If the URL has a hash, let the browser handle anchor scroll.
    if (typeof window !== "undefined" && window.location.hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/the-how" component={TheHow} />
      <Route path="/ingredients" component={Ingredients} />
      <Route path="/ingredients/:id" component={IngredientPage} />
      <Route path="/preorder" component={PreorderPage} />
      <Route path="/our-promise" component={OurPromise} />
      <Route path="/showcase">
        <Suspense fallback={<div className="min-h-screen bg-[#EBE8E1]" />}>
          <Showcase />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Router />
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
}

export default App;
