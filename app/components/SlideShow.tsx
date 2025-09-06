'use client'
import React, { useEffect, useState } from "react";

const SlideShow = () => {
  const slides = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
  ];

  const [current, setCurrent] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel w-full h-90">
      {slides.map((src, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full ${
            index === current ? "block" : "hidden"
          }`}
        >
          <img src={src} className="w-full object-cover h-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button
              className="btn btn-circle"
              onClick={() =>
                setCurrent((prev) =>
                  prev === 0 ? slides.length - 1 : prev - 1
                )
              }
            >
              ❮
            </button>
            <button
              className="btn btn-circle"
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            >
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideShow;
