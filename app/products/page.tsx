import React from "react";
import ProductCard from "./components/ProductCard";

const productPage = () => {
  return (
    <div>
      <h1>Product Page</h1>
      <div className=" grid gird-1 sm:grid-cols-3 md:grid-cols-4 lg:grid lg:grid-cols-5 gap-4 m-auto ">
        <ProductCard
          src="/watch.jpeg"
          alt="Watch"
          className="h-80 w-full"
          btn="Browse"
          title="Wearables"
          description="Enjoy"
        />
        <ProductCard
          src="/watch.jpeg"
          alt="Watch"
          className="h-80 w-full"
          btn="Browse"
          title="Wearables"
          description="Enjoy"
        />
        <ProductCard
          src="/watch.jpeg"
          alt="Watch"
          className="h-80 w-full"
          btn="Browse"
          title="Wearables"
          description="Enjoy"
        />
        <ProductCard
          src="/watch.jpeg"
          alt="Watch"
          className="h-80 w-full"
          btn="Browse"
          title="Wearables"
          description="Enjoy"
        />
        <ProductCard
          src="/watch.jpeg"
          alt="Watch"
          className="h-80 w-full"
          btn="Browse"
          title="Wearables"
          description="Enjoy"
        />
        <ProductCard
          src="/watch.jpeg"
          alt="Watch"
          className="h-80 w-full"
          btn="Browse"
          title="Wearables"
          description="Enjoy"
        />
      </div>
    </div>
  );
};

export default productPage;
