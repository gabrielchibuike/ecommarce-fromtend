import { BsArrowRight } from "react-icons/bs";
import { fetchProducts } from "@/utils/productFetchApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import Card from "./Card";

function DealOfTheDay() {
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
      <div className="px-11 my-16 max-lg:my-2  max-lg:px-2">
        <div className="space-y-2 max-lg:space-y-1">
          <h2 className="text-lg font-semibold max-lg:text-xs">Today's Deal</h2>
          <h1 className="text-3xl font-semibold max-lg:text-base">
            Deals Of The Day
          </h1>
        </div>

        <div className="w-full flex items-center gap-4 pt-10 max-lg:pt-3 overflow-x-scroll">
          <Card additionalClass="!w-full !min-h-[400px] !border !border-zinc-300 max-lg:!min-h-[140px] !bg-transparent !p-0 max-lg:!flex-shrink-0">
            <div className="flex items-center max-lg:flex-col  gap-4 p-2 ">
              <div className="w-full h-[400px] bg-black">
                <Image
                  src={"/deal.avif"}
                  width={500}
                  height={500}
                  alt={""}
                  className="w-full h-[400px] max-lg:object-cover rounded-xl"
                />
              </div>
              <div className="w-full space-y-2 pt-5">
                <p className="t text-zinc-500">Coat</p>
                <div className="font-semibold text-xl">Trendy Brown Coat</div>
                <div className="flex items-cente gap-4 text-xl">
                  <div>$75.00</div>
                  <div className="line-through text-zinc-500">$175.00</div>
                </div>
                <div className="py-2">
                  <div className="flex gap-2 items-center">
                    <AiFillStar className="text-yellow-600 text-lg" />
                    <p>4.5</p>
                  </div>
                  <div className="text-base  py-2 text-zinc-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat cupiditate animi incidunt ab mollitia labore? Illum
                    fugit voluptate rerum quae.
                  </div>
                  <div className="flex gap-2 items-center pt-2 cursor-pointer text-[#250b0b]">
                    <div>Shop Now </div>
                    <BsArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card additionalClass="!w-full !min-h-[400px] !border !border-zinc-300 max-lg:!min-h-[140px] !bg-transparent !p-0   max-lg:!flex-shrink-0">
            <div className="flex items-center max-lg:flex-col  gap-4 p-2 ">
              <div className="w-full h-[400px] bg-black">
                <Image
                  src={"/deal.avif"}
                  width={500}
                  height={500}
                  alt={""}
                  className="w-full h-[400px] max-lg:object-cover rounded-xl"
                />
              </div>
              <div className="w-full space-y-2 pt-5">
                <p className="t text-zinc-500">Coat</p>
                <div className="font-semibold text-xl">Trendy Brown Coat</div>
                <div className="flex items-cente gap-4 text-xl">
                  <div>$75.00</div>
                  <div className="line-through text-zinc-500">$175.00</div>
                </div>
                <div className="py-2">
                  <div className="flex gap-2 items-center">
                    <AiFillStar className="text-yellow-600 text-lg" />
                    <p>4.5</p>
                  </div>
                  <div className="text-base  py-2 text-zinc-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat cupiditate animi incidunt ab mollitia labore? Illum
                    fugit voluptate rerum quae.
                  </div>
                  <div className="flex gap-2 items-center pt-2 cursor-pointer text-[#250b0b]">
                    <div>Shop Now </div>
                    <BsArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DealOfTheDay;
