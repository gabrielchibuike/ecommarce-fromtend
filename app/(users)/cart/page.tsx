import { BsTrash3 } from "react-icons/bs";
import NavBar from "@/app/Components/NavBar";
import React from "react";
import { MdVerified } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import Button from "@/app/Components/Button";
import Products from "@/app/Components/Products";
import SideNav from "@/app/Components/SideNav";

function page() {
  return (
    <>
      <NavBar />
      <SideNav />
      <div className="w-full  px-20 max-lg:px-2 py-4 max-lg:py-2 flex gap-2 max-lg:flex-col">
        <div className="w-[70%] max-lg:w-full h-fit bg-zinc-400/5 px-7 max-lg:px-3 py-4">
          <div className="w-full border-b border-yellow-600 text-lg font-semibold">
            cart (1)
          </div>
          <div>
            <div className="flex justify-between py-5 max-lg:flex-col">
              <div className="w-full flex  gap-2">
                <div className="w-20 max-lg:w-32 h-20 bg-zinc-400 "></div>
                <div className="w-full flex max-lg:flex-col justify-between">
                  <div>
                    <h1 className="text-xl max-lg:text-sm font-semibold">
                      Line pattarn zipper sweat.
                    </h1>
                    <div className="flex items-center gap-1 py-1">
                      <MdVerified className="text-green-600" />
                      <p className="text-xs font-semibold  text-green-600">
                        Avaliable in stock
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex  items-center py-1">
                      <TbCurrencyNaira className="text-xl" />
                      <h2 className="text-xl font-semibold">3000</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-1 items-center text-yellow-600 font-semibold text-sm cursor-pointer">
                <BsTrash3 />
                <p>Remove</p>
              </div>
              <div>
                <div className="flex py-1 cursor-pointer">
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
            </div>
          </div>
        </div>
        <div className="w-[27%] max-lg:w-full h-48 bg-zinc-400/5 px-5 py-4">
          <div className="w-full border-b border-yellow-600 text-sm font-semibold">
            CART SUMMARY
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="font-semibold">SubTotal</div>
            <div className="flex gap-2">
              <div className="flex  items-center py-1">
                <TbCurrencyNaira className="text-lg" />
                <h2 className="text-lg font-semibold">3000</h2>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-800 font-semibold">
            Delivery fee is not included yet
          </p>
          <div className="py-3 mt-3">
            <Button
              btn_text={"PROCEED TO CHECKOUT"}
              addtional_class="!w-full"
            />
          </div>
        </div>
      </div>
      <div className="px-20 max-lg:px-2">
        <Products />
      </div>
    </>
  );
}

export default page;
