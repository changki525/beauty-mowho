"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#000',
    }}>
      {/* Full Screen Spline - No overlay, standalone */}
      {isClient && (
        <iframe
          src="https://my.spline.design/r4xbot-QvN89riDz8f7o9zo1AaXcUXc/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          allow="autoplay; fullscreen"
          loading="eager"
        />
      )}
    </section>
  );
}
