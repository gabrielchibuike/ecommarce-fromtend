import React from "react";
import Products from "../Components/Products";

function FeaturedProducts() {
  return (
    <>
      <div className="w-full min-h-screen bg-zinc-100/50 mt-10 max-lg:mt-3 px-20  max-lg:px-1 py-5 max-lg:py-2">
        <div className="">
          <h1 className="font-bold text-lg">Featured Products</h1>
        </div>
        <Products />
      </div>
    </>
  );
}

export default FeaturedProducts;
