/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";
import Card from "./Card";
// import { products } from "../Constants/data";

import Image from "next/image";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";

function Products({
  products,
  isLoading,
}: {
  products?: any;
  isLoading?: boolean;
}) {
  return (
    <>
      <div className="w-full  pt-1 max-lg:pt-3">
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
                <div className="w-full min-h-[400px] px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
                    {products.map((product: any, index: number) => (
                      <Link
                        href={`/${product._id}`}
                        key={index}
                        className="block"
                      >
                        <Card additionalClass="!w-[250px]  !min-h-[250px] max-lg:!min-h-[140px] !p-0 max-lg:!w-[250px] flex-shrink-0 !bg-transparent !relative ">
                          <div className="w-16 h-7 bg-white text-green-800 absolute top-2 left-2 flex items-center justify-center text-xs">
                            50% off
                          </div>

                          <div className="p-1 rounded-full bg-white absolute top-2 right-2 cursor-pointer">
                            <AiOutlineHeart className="text-xl" />
                          </div>
                          <div className="w-full h-[230px] max-lg:h-[300px] flex bg-zinc-300/30">
                            <Image
                              src={product.product_image[0]}
                              alt=""
                              width={500}
                              height={500}
                              className="contain w-full "
                            />
                          </div>
                          <div className="pt-5">
                            <div className="flex justify-between items-center text-sm">
                              <p className="text-base text-zinc-500">Coat</p>
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
                </div>
              )}
              {/* <div className="flex gap-3 justify-center">
                {pigenation.map((ele, index) => (
                  <div
                    className="bg-primary w-12 flex justify-center cursor-pointer items-center h-10 text-white"
                    key={index}
                  >
                    {ele.item}
                  </div>
                ))}
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
