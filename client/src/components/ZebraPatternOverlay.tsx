import zebraPattern from '../assets/zebra-pattern-new.webp';

interface ZebraPatternOverlayProps {
  opacity?: number;
  className?: string;
}

export default function ZebraPatternOverlay({ opacity = 0.078, className = '' }: ZebraPatternOverlayProps) {
  return (
    <div 
      className={`absolute inset-0 z-0 ${className}`} 
      style={{
        backgroundImage: `url(${zebraPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '250px auto',
        opacity,
        filter: 'sepia(100%) hue-rotate(120deg) saturate(50%) brightness(80%)',
        transform: 'rotate(225deg)',
        pointerEvents: 'none'
      }}
    />
  );
}