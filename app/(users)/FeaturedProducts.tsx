import React from "react";
import Products from "../Components/Products";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productFetchApi";
import Image from "next/image";
import Button from "../Components/Button";
import useCustomRouter from "../hooks/useCustomRouter";

function FeaturedProducts() {
  const { navigateTo } = useCustomRouter();
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => fetchProducts(),
    queryKey: ["products"],
    staleTime: 1 * 60000,
  });
  return (
    <>
      <div className="w-full min-h-screen bg-zinc-100/50 mt-10 max-lg:mt-3 px-[50px]  max-lg:px-1 py-5 max-lg:py-2">
        <div className="">
          <h1 className="font-bold text-lg max-lg:text-base">
            Featured Products
          </h1>
        </div>
        <div>
          {products && products.length === 0 ? (
            <div className="w-full h-[70%] flex items-center justify-center flex-col">
              <Image
                src={"/cart_icon.png"}
                width={200}
                height={200}
                className="cover "
                alt=""
              />
              <div className="flex flex-col justify-center space-y-3">
                <h1 className="text-lg font-semibold font-[poppins]">
                  Product List Is Empty
                </h1>
                <Button
                  btn_text={"Add Product"}
                  addtional_class="!rounded-2xl"
                  onclick_event={() => {
                    navigateTo("/admin/product/addProduct");
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div>Loading....</div>
              ) : (
                <Products products={products} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
