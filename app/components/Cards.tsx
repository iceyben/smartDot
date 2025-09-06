import Image from "next/image";
import React from "react";

const Cards = () => {
  return (
    <div className=" bg-base-100 w-60 shadow-sm ">
      <figure>
        <Image
          src="/image1.jpg"
          alt="Live Sound Card"
          className="w-full object-cover px-2"
          width={96}
          height={30}
        />
      </figure>
      <div className=" p-3">
        <h2 className="card-title">Live Sound Card</h2>
        <p className="text-sm">A card component has a figure, a body part,</p>
        <div className="">
          <button className="bg-green-500 px-3 py-1 rounded-md shadow-sm font-medium mt-3 ">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
