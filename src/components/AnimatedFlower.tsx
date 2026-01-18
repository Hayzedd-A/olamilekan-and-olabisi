const AnimatedFlower = () => {
  return (
    <div className="absolute right-0 top-0 h-28 w-28 translate-x-6 -translate-y-6 transition-transform group-hover:scale-125">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full animate-flower-bloom"
        fill="yellow"
      >
        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="25"
            rx="12"
            ry="22"
            className="animate-petal-wave fill-accent-foreground/20 stroke-primary/30"
            style={{
              transformOrigin: "50px 50px",
              transform: `rotate(${rotation}deg)`,
              animationDelay: `${i * 0.15}s`,
            }}
            strokeWidth="0.5"
          />
        ))}
        {/* Inner petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((rotation, i) => (
          <ellipse
            key={`inner-${i}`}
            cx="50"
            cy="32"
            rx="8"
            ry="15"
            className="animate-petal-wave fill-accent-foreground/15 stroke-primary/20"
            style={{
              transformOrigin: "50px 50px",
              transform: `rotate(${rotation}deg)`,
              animationDelay: `${i * 0.15 + 0.1}s`,
            }}
            strokeWidth="0.5"
          />
        ))}
        {/* Center */}
        <circle
          cx="50"
          cy="50"
          r="10"
          className="animate-pulse fill-accent-foreground/30"
        />
        <circle
          cx="50"
          cy="50"
          r="5"
          className="animate-pulse fill-accent-foreground/50"
          style={{ animationDelay: "0.5s" }}
        />
      </svg>
    </div>
  );
};

export default AnimatedFlower;
