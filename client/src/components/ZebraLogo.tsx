interface ZebraLogoProps {
  className?: string;
}

export default function ZebraLogo({ className }: ZebraLogoProps) {
  return (
    <div className={className || "w-16 h-16 md:w-20 md:h-20"}>
      <img 
        src="/images/zebra-head-latest.webp" 
        alt="Zebra head" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
