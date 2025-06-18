interface B2BLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function B2BLogo({ className = "", size = "md" }: B2BLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle 
        cx="60" 
        cy="60" 
        r="55" 
        fill="hsl(var(--b2b-blue))" 
        stroke="hsl(var(--b2b-blue))" 
        strokeWidth="2"
      />
      
      {/* B2B Text */}
      <text 
        x="60" 
        y="45" 
        textAnchor="middle" 
        className="fill-white text-2xl font-bold"
        style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}
      >
        B2B
      </text>
      
      {/* Market Text */}
      <text 
        x="60" 
        y="68" 
        textAnchor="middle" 
        className="fill-white text-sm font-medium"
        style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}
      >
        MARKET
      </text>
      
      {/* Connection Lines */}
      <g stroke="white" strokeWidth="2" fill="none">
        <line x1="25" y1="35" x2="35" y2="45" />
        <line x1="95" y1="35" x2="85" y2="45" />
        <line x1="25" y1="85" x2="35" y2="75" />
        <line x1="95" y1="85" x2="85" y2="75" />
      </g>
      
      {/* Small Dots for Network Effect */}
      <circle cx="30" cy="30" r="3" fill="white" />
      <circle cx="90" cy="30" r="3" fill="white" />
      <circle cx="30" cy="90" r="3" fill="white" />
      <circle cx="90" cy="90" r="3" fill="white" />
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--b2b-blue))" />
          <stop offset="50%" stopColor="hsl(var(--b2b-cyan))" />
          <stop offset="100%" stopColor="hsl(var(--b2b-orange))" />
        </linearGradient>
      </defs>
    </svg>
  );
}