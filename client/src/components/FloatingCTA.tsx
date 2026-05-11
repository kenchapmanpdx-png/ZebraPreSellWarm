import { useState } from "react";
import WaitlistModal from "./WaitlistModal";

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  const buttonStyle: React.CSSProperties = {
    backgroundImage: "linear-gradient(to right, #A4613A 0%, #C4856A 50%, #A4613A 100%)",
    backgroundSize: "200% auto",
    backgroundPosition: "left center",
  };

  return (
    <>
      <div id="floating-cta" className="fixed bottom-6 right-6 z-40 fade-in">
        <button
          onClick={() => setOpen(true)}
          style={buttonStyle}
          aria-label="Open waitlist signup"
          className="text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 flex items-center focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "right center")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "left center")}
        >
          Join Waitlist
        </button>
      </div>
      <WaitlistModal open={open} onOpenChange={setOpen} />
    </>
  );
}
