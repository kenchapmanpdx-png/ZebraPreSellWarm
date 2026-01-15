export default function FloatingCTA() {
  const handleClick = () => {
    const heroForm = document.getElementById('waitlist-form');
    if (heroForm) {
      heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const buttonStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(to right, #A4613A 0%, #C4856A 50%, #A4613A 100%)',
    backgroundSize: '200% auto',
    backgroundPosition: 'left center',
  };

  return (
    <div id="floating-cta" className="fixed bottom-6 right-6 z-40 fade-in">
      <button 
        onClick={handleClick}
        style={buttonStyle}
        className="text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-[650ms] transform hover:-translate-y-1 flex items-center focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]"
        onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right center'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left center'}
      >
        Join Waitlist
      </button>
    </div>
  );
}