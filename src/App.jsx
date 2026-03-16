import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Added for smooth exit
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Details from "./pages/Details";
import Registration from "./pages/Registration";
import Organizers from "./pages/Organizers";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import CursorGlow from "./components/CursorGlow";
import SmoothScroll from "./components/SmoothScroll";
import DataStreamBg from "./components/DataStreamBg";
import LoadingSkeleton from "./components/LoadingSkeleton"; // Added Import

// ✅ IMPORT ENV CONFIG
import env from "./config/env";
import { getEvent } from "./services/api";
import { useEventStore } from "./store/useEventStore";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const setEvent = useEventStore((state) => state.setEvent);
  const setLoading = useEventStore((state) => state.setLoading);
  const setError = useEventStore((state) => state.setError);
  const loading = useEventStore((state) => state.loading); // Access loading state

  // ✅ NEW STATE TO ENSURE SKELETON STAYS FOR IMPACT
  const [skeletonFinished, setSkeletonFinished] = useState(false);

  // ✅ FETCH EVENT DATA WITH RETRY LOGIC
  useEffect(() => {
    let currentRetry = 0;
    let timeoutId = null;

    const fetchEventData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`📡 [App] Fetching event data (Attempt ${currentRetry + 1}/${env.api.retryAttempts + 1})...`);
        const res = await getEvent();
        if (res.data?.success && res.data?.data) {
          setEvent(res.data.data);
        } else {
          setError("Received invalid data from server.");
        }
      } catch (err) {
        const isRetryable = err.type === "NETWORK" || err.status === 503 || err.type === "TIMEOUT" || err.status === 504;
        if (currentRetry < env.api.retryAttempts && isRetryable) {
          currentRetry++;
          timeoutId = setTimeout(() => {
            fetchEventData();
          }, env.api.retryDelay);
        } else {
          setError(err.message || "Unable to connect to backend server.");
        }
      } finally {
        // We don't set loading false here because setEvent does it internally usually,
        // but we ensure the skeleton has a chance to trigger its own completion.
      }
    };

    fetchEventData();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [setEvent, setLoading, setError]);

  // ✅ DETERMINES IF MAIN CONTENT SHOULD SHOW
  const showContent = !loading && skeletonFinished;

  return (
    <>
      {/* ✅ LOADING OVERLAY - STAYS UNTIL DATA IS READY AND ANIMATION FINISHES */}
      <AnimatePresence mode="wait">
        {!showContent && (
          <LoadingSkeleton 
            key="loader" 
            onLoadingComplete={() => setSkeletonFinished(true)} 
          />
        )}
      </AnimatePresence>

      {/* ✅ MAIN APP CONTENT */}
      {showContent && (
        <SmoothScroll>
          <div className="relative min-h-screen bg-void-black overflow-hidden">
            {env.features.customCursor && <CustomCursor />}
            {env.features.customCursor && <CursorGlow />}

            <ScrollToTop />
            <Navbar />
            <DataStreamBg />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/details" element={<Details />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/organizers" element={<Organizers />} />
              <Route path="/success/:id" element={<Success />} />
            </Routes>

            <Footer />

            {env.app.isDev && env.features.debugMode && (
              <div className="fixed bottom-4 left-4 z-50 glass-strong rounded-xl p-3 text-xs font-mono">
                <p className="text-cyber-blue">🔧 Debug Mode Active</p>
                <p className="text-white/40">API: {env.api.baseURL}</p>
              </div>
            )}
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;