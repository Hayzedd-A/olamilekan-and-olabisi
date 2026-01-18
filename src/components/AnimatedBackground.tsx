import { useState, useEffect } from "react";

const backgroundImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1920&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80",
];

const AnimatedBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center animate-slow-pan"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "120%",
            }}
          />
        </div>
      ))}
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
    </div>
  );
};

export default AnimatedBackground;
