import React from "react";
import SlideShow from "./SlideShow";

const Hero = () => {
  return (
    <div className="hero bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row">
        <SlideShow />
        <div>
          <h1 className="text-5xl font-bold">
            Smart Electronics for Smarter Living.
          </h1>
          <p className="py-6">
            Discover cutting-edge electronics designed to make your everyday
            tasks easier, faster, and more enjoyable—all at prices that fit your
            budget.
          </p>
          <button className="btn btn-primary">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
