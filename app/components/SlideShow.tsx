"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const SlideShow = () => {
  const slides = [
    "/image1.jpg",
    "/image2.jpeg",
    "/image3.jpeg",
    "/image4.jpg",
    "/image5.jpg",
    "/image6.jpg",
    "/image7.jpg",
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
          className={`carousel-item relative w-full h-full ${ // Added h-full to the parent div for Image fill
            index === current ? "block" : "hidden"
            }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`} // Added alt prop
            fill // Added fill prop to make Image cover its parent
            className="object-cover" // Moved object-cover to Image component
            priority={index === 0} // Added priority for the first image
          />
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
