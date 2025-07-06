/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Footer from "@/app/Components/Footer";
import NavBar from "@/app/Components/NavBar";
import ProductFilter from "@/app/Components/product/ProductFilter";
import SideNav from "@/app/Components/SideNav";
import React from "react";

// import useCustomRouter from "@/app/hooks/useCustomRouter";

function ProductSlug({
  params,
}: {
  params: Promise<{
    gender: string;
    productCategory: string;
    subCategory: string;
  }>;
}) {
  const { gender, productCategory, subCategory } = React.use(params);

  console.log(gender, productCategory, subCategory);

  return (
    <>
      <div className="w-full min-h-screen ">
        <NavBar />
        <SideNav />
        <div className="pt-16 px-11 max-lg:px-1 bg-primary-foreground w-full h-[250px] flex  items-center justify-center">
          <h1 className="text-xl font-medium capitalize">
            {gender} &gt; {productCategory} &gt; {subCategory}
          </h1>
        </div>
        <div className=" w-full px-11 max-sm:px-1 max-md:px-5  max-lg:">
          <ProductFilter
            gender={gender}
            productCategory={productCategory}
            subCategory={subCategory}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductSlug;
