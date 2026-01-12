export default function FloatingCTA() {
  const handleClick = () => {
    const heroForm = document.getElementById('waitlist-form');
    if (heroForm) {
      heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div id="floating-cta" className="fixed bottom-6 right-6 z-40 fade-in">
      <button 
        onClick={handleClick}
        className="bg-[#A4613A] hover:bg-[#8E5433] active:bg-[#744428] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]"
      >
        Join Waitlist
      </button>
    </div>
  );
}
