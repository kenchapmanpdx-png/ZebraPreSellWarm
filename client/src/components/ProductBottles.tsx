export default function ProductBottles() {
  return (
    <svg aria-hidden="true" 
      width="320" 
      height="320" 
      viewBox="0 0 320 320" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <linearGradient id="amBottle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="pmBottle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
        </filter>
      </defs>
      
      {/* Background */}
      <rect width="320" height="320" fill="url(#bgGradient)" />
      
      {/* AM Bottle */}
      <g transform="translate(80, 60)">
        {/* Bottle body */}
        <rect x="0" y="20" width="50" height="120" rx="8" fill="url(#amBottle)" filter="url(#shadow)" />
        {/* Cap */}
        <rect x="8" y="10" width="34" height="20" rx="4" fill="#ea580c" />
        {/* Label background */}
        <rect x="5" y="50" width="40" height="60" rx="3" fill="white" fillOpacity="0.9" />
        {/* AM Text */}
        <text x="25" y="70" textAnchor="middle" fill="#ea580c" fontSize="12" fontWeight="bold">AM</text>
        <text x="25" y="85" textAnchor="middle" fill="#9a3412" fontSize="8">Morning</text>
        <text x="25" y="95" textAnchor="middle" fill="#9a3412" fontSize="8">Energy</text>
        {/* Pills visualization */}
        <circle cx="15" cy="120" r="2" fill="#ea580c" fillOpacity="0.6" />
        <circle cx="25" cy="115" r="2" fill="#ea580c" fillOpacity="0.6" />
        <circle cx="35" cy="120" r="2" fill="#ea580c" fillOpacity="0.6" />
      </g>
      
      {/* PM Bottle */}
      <g transform="translate(190, 60)">
        {/* Bottle body */}
        <rect x="0" y="20" width="50" height="120" rx="8" fill="url(#pmBottle)" filter="url(#shadow)" />
        {/* Cap */}
        <rect x="8" y="10" width="34" height="20" rx="4" fill="#2563eb" />
        {/* Label background */}
        <rect x="5" y="50" width="40" height="60" rx="3" fill="white" fillOpacity="0.9" />
        {/* PM Text */}
        <text x="25" y="70" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">PM</text>
        <text x="25" y="85" textAnchor="middle" fill="#1e40af" fontSize="8">Evening</text>
        <text x="25" y="95" textAnchor="middle" fill="#1e40af" fontSize="8">Recovery</text>
        {/* Pills visualization */}
        <circle cx="15" cy="120" r="2" fill="#2563eb" fillOpacity="0.6" />
        <circle cx="25" cy="115" r="2" fill="#2563eb" fillOpacity="0.6" />
        <circle cx="35" cy="120" r="2" fill="#2563eb" fillOpacity="0.6" />
      </g>
      
      {/* Brand label */}
      <text x="160" y="240" textAnchor="middle" fill="#0f2e24" fontSize="18" fontWeight="bold" fontFamily="Playfair Display, serif">ZebraThrive</text>
      <text x="160" y="258" textAnchor="middle" fill="#0f2e24" fontSize="10" fillOpacity="0.7">Clinical-Grade Formula</text>
      
      {/* Decorative elements */}
      <circle cx="50" cy="50" r="2" fill="#d4af37" fillOpacity="0.3" />
      <circle cx="270" cy="70" r="1.5" fill="#d4af37" fillOpacity="0.3" />
      <circle cx="60" cy="250" r="1" fill="#d4af37" fillOpacity="0.3" />
      <circle cx="260" cy="240" r="2" fill="#d4af37" fillOpacity="0.3" />
    </svg>
  );
}