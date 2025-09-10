import React from "react";
import SlideShow from "./SlideShow";
import Link from "next/link";

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
          <Link href="/products">
            <button className="btn bg-[#f9bf29] hover:bg-yellow-500  w-40 flex m-auto">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
