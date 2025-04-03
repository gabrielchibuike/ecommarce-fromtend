import { AiOutlineHeart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import React, { useEffect, useRef } from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productFetchApi";
import Image from "next/image";
import Link from "next/link";

function BestSelling() {
  const tabRef = useRef<HTMLDivElement[]>([]);

  const filterBy = [
    {
      name: "All",
    },
    {
      name: "Men",
    },
    {
      name: "Women",
    },
    {
      name: "Accessories",
    },
  ];

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

  function handleSwitch(index: number) {
    tabRef.current.forEach((ele, _) => {
      ele.classList.remove("bg-primary");
      ele.classList.replace("text-primary-foreground", "text-black");
    });
    tabRef.current[index].classList.add("bg-primary");
    tabRef.current[index].classList.add("text-primary-foreground");
  }

  useEffect(() => {
    tabRef.current.forEach((ele, _) => {
      ele.classList.remove("bg-primary");
      ele.classList.replace("text-primary-foreground", "text-black");
    });
    tabRef.current[0].classList.add("bg-primary");
    tabRef.current[0].classList.add("text-primary-foreground");
  }, []);
  return (
    <>
      <div>
        <div className=" px-11 my-16 max-lg:px-2 max-lg:my-2  ">
          <div className="flex justify-between">
            <div className="space-y-2 max-lg:space-y-1">
              <h2 className="text-lg font-semibold max-lg:text-xs">
                Our Products
              </h2>
              <h1 className="text-3xl font-semibold max-lg:text-base">
                Our Top Selling Products
              </h1>
            </div>
            <div className="flex gap-3 max-lg:hidden">
              {filterBy.map((ele, index) => (
                <div
                  className=" p-2 h-6 rounded-md bg-primary text-sm text-primary-foreground cursor-pointer flex items-center"
                  key={index}
                  onClick={() => handleSwitch(index)}
                  ref={(ele: HTMLDivElement) => {
                    tabRef.current[index] = ele;
                  }}
                >
                  <div>{ele.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-10 max-lg:pt-3">
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
                    {/* <Button
                      btn_text={"Add Product"}
                      addtional_class="!rounded-2xl"
                      onclick_event={() => {
                        navigateTo("/admin/product/addProduct");
                      }}
                    /> */}
                  </div>
                </div>
              ) : (
                <div>
                  {isLoading ? (
                    <div>Loading....</div>
                  ) : (
                    <div className="flex gap-4 justify-between overflow-x-scroll">
                      {products &&
                        products.map((product: any, index: number) => (
                          <Link
                            href={`/${product._id}`}
                            key={index}
                            className=""
                          >
                            <Card additionalClass="!w-[350px]  !min-h-[500px] max-lg:!min-h-[140px] !p-0 max-lg:!w-[250px] flex-shrink-0 !bg-transparent !relative">
                              <div className="w-16 h-7 bg-white text-green-800 absolute top-2 left-2 flex items-center justify-center text-xs">
                                50% off
                              </div>

                              <div className="p-1 rounded-full bg-white absolute top-2 right-2 cursor-pointer">
                                <AiOutlineHeart className="text-xl" />
                              </div>
                              <div className="w-full h-[400px] max-lg:h-[300px] flex bg-zinc-300/30">
                                <Image
                                  src={product.product_image[0]}
                                  alt=""
                                  width={500}
                                  height={500}
                                  className="contain w-full h "
                                />
                              </div>
                              <div className="pt-5">
                                <div className="flex justify-between items-center">
                                  <p className="text-base text-zinc-500">
                                    Coat
                                  </p>
                                  <div className="flex gap-2 items-center">
                                    <AiFillStar className="text-yellow-600 text-lg" />
                                    <p>4.5</p>
                                  </div>
                                </div>
                                <div className="font-semibold text-lg">
                                  Trendy Brown Coat
                                </div>
                                <div className="flex items-center gap-4 py-2 text-lg">
                                  <div>$75.00</div>
                                  <div className="line-through text-zinc-500">
                                    $175.00
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BestSelling;
