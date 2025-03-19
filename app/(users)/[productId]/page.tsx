"use client";
import { MdVerified } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import Card from "@/app/Components/Card";
import Footer from "@/app/Components/Footer";
import NavBar from "@/app/Components/NavBar";
import React, { useEffect } from "react";
import Button from "@/app/Components/Button";
import Products from "@/app/Components/Products";
import SideNav from "@/app/Components/SideNav";
import { useSelector } from "react-redux";

function page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = React.use(params);

  const tokenpayload = useSelector(
    (state: any) => state.getTokenResult.value.tokenPayload
  );

  useEffect(() => {
    console.log(tokenpayload);
  }, []);
  return (
    <>
      <div>
        <NavBar />
        <SideNav />
        <div className="px-20 py-5 max-lg:px-2">
          <div className="flex gap-5 max-lg:flex-col">
            <div className="w-full flex gap-3 max-lg:flex-col-reverse">
              <div className="w-24 min-h-[300px] bg-zinc-400 max-lg:w-full max-lg:min-h-20"></div>
              <div className="w-full min-h-[300px] bg-zinc-400"></div>
            </div>
            <div className="w-full ">
              <h1 className="text-xl font-semibold">
                Line pattarn zipper sweat.
              </h1>
              <div className="flex  items-center py-1">
                <TbCurrencyNaira className="text-xl" />
                <h2 className="text-xl font-bold">3000</h2>
              </div>
              <div className="flex gap-2 items-center py-1 max-lg:py-2">
                <div className="flex gap-1">
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </div>

                <div className="text-sm">
                  (5)Reviews |{" "}
                  <span className="cursor-pointer font-semibold text-yellow-600">
                    {" "}
                    Add Reviews
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 py-1">
                <MdVerified className="text-green-600" />
                <p className="text-xs font-semibold  text-green-600">
                  Avaliable in stock
                </p>
              </div>
              <div className="flex max-lg:flex-col lg:items-center py-2 gap-6 max-lg:gap-3">
                <div className="space-y-1 max-lg:space-y-0">
                  <h1 className="text-sm font-semibold">Colors:</h1>
                  <div className="flex gap-1 cursor-pointer">
                    <div className="w-8 h-6 bg-black"></div>
                    <div className="w-8 h-6 bg-blue-600"></div>
                    <div className="w-8 h-6 bg-red-600"></div>
                    <div className="w-8 h-6 bg-green-600"></div>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <h1 className="text-sm font-semibold">Size:</h1>
                    <div className="flex gap-2 cursor-pointer font-medium text-sm">
                      <div className="w-8 h-6 border border-zinc-800/30 text-center text-sm">
                        S
                      </div>
                      <div className="w-8 h-6 border border-zinc-800/30 text-center text-sm">
                        M
                      </div>
                      <div className="w-8 h-6 border border-zinc-800/30 text-center text-sm">
                        L
                      </div>
                      <div className="w-8 h-6 border border-zinc-800/30 text-center text-sm">
                        XS
                      </div>
                      <div className="w-8 h-6 border border-zinc-800/30 text-center text-sm">
                        XL
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-sm font-semibold"> QTY:</span>
                <div className="flex py-1">
                  <div className="w-8 h-6 bg-black text-white text-xl rounded-l-sm flex items-center justify-center ">
                    -
                  </div>
                  <div className="w-8 h-6 bg-white border border-zinc-600 text-zinc-800  text-xl flex items-center justify-center">
                    0
                  </div>
                  <div className="w-8 h-6 bg-black text-white text-xl rounded-r-rounded-l-sm flex items-center justify-center ">
                    +
                  </div>
                </div>
              </div>
              <div className="py-3 mt-3 max-lg:hidden">
                <Button
                  btn_text={"ADD TO CART"}
                  addtional_class="max-lg:!w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex  gap-4 py-10 max-lg:py-2 ">
            <div className="w-[200px] min-h-10 space-y-1 border border-zinc-500/20 max-lg:hidden">
              <div className=" text-xs py-2 font-semibold px-2 text-yellow-600">
                PRODUCT DESCRIPTION
              </div>
              <div className="bg-zinc-400/10 text-xs py-2  font-semibold px-2 ">
                CUSTOMER REVIEWS
              </div>
            </div>
            <div className="w-[700px] text-zinc-600 text-sm font-medium border-t border-zinc-500/20">
              <div className=" text-xs py-2 font-semibold  text-yellow-600 lg:hidden">
                PRODUCT DESCRIPTION
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus accusantium maiores eum qui. Eius, veniam harum
              incidunt debitis blanditiis est totam porro atque saepe odio
              sequi, alias doloribus assumenda amet. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Repellendus accusantium maiores eum
              qui. Eius, veniam harum incidunt debitis blanditiis est totam
              porro atque saepe odio sequi, alias doloribus assumenda amet.
            </div>
          </div>
          <div className="py-3 mt-3 lg:hidden">
            <Button btn_text={"ADD TO CART"} addtional_class="max-lg:!w-full" />
          </div>

          <div>
            <h1 className="font-bold text-sm">RELATED PRODUCTS</h1>
            <Products />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default page;
