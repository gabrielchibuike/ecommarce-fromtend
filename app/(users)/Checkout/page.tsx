"use client";
import { IoMdWallet } from "react-icons/io";
import Button from "@/app/Components/Button";
import NavBar from "@/app/Components/NavBar";
import { RadioGroup, RadioGroupItem } from "@/app/Components/RadioUnput";
import SideNav from "@/app/Components/SideNav";
import Image from "next/image";
import React from "react";
import { TbCurrencyNaira } from "react-icons/tb";

function EditShippingAddress() {
  return (
    <>
      <NavBar />
      <SideNav />
      <div className="flex">
        <div className="w-full h-screen px-11 pt-20 max-lg:px-2 py-2">
          <div className="flex items-center gap-4 max-lg:flex-col">
            <div className="w-full space-y-3">
              <div className="w-full h-fit bg-zinc-400/5 ">
                <div className="w-full px-2  py-4">
                  <div className="flex items-center justify-between gap-2 py-1 border-b border-zinc-400/15 ">
                    <h1 className="text-lg font-semibold">Shipping Address</h1>
                    <p className="text-sm cursor-pointer underline text-primary">
                      Edit
                    </p>
                  </div>
                  <div className="space-y-2 py-3">
                    <h1 className="text-lg">Chibuike Gabriel</h1>
                    <div className="flex gap-2 items-center py-1 text-xs">
                      <p>11, Ibafon Street</p> <span>|</span>{" "}
                      <p>Apapa(Olodi)-Lagos</p>
                    </div>
                    <p className="text-xs">+234 814 139 3379</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit bg-zinc-400/5 ">
                <div className="w-full px-2  py-4">
                  <div className=" py-1 border-b border-zinc-400/15 ">
                    <h1 className="text-lg font-semibold">Payment Method</h1>
                  </div>
                  <div className="px-4">
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Image
                          src={"/download.png"}
                          width={100}
                          height={100}
                          className=" h-20"
                          alt=""
                        />
                        {/* <div className="">
                        </div> */}
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <div className="flex gap-2 items-center">
                          <IoMdWallet className="text-primary-foregroundimary" />
                          <label
                            htmlFor="option-two"
                            className="font-medium text-sm"
                          >
                            Pay on delivery
                          </label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[600px] max-lg:w-full text-zinc-800">
              <div className="w-full max-lg:w-full h-fit bg-zinc-400/5  px-5 py-4">
                <div className="w-full border-b my-3 py-3 border-primary/25 text-sm font-semibold">
                  ORDER SUMMARY
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
                <div className="text-sm  ">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ">
                      <p>Items</p>
                      <p>8</p>
                    </div>
                    <div className="flex justify-between items-center ">
                      <p>Sub Total</p>
                      <p>323</p>
                    </div>
                    <div className="flex justify-between items-center ">
                      <p>Shipping</p>
                      <p>00.0</p>
                    </div>
                  </div>
                  <div className="flex mt-5 justify-between  items-center text-lg">
                    <p>Total</p>
                    <p>00.0</p>
                  </div>
                </div>
                <div className="py-3 mt-3">
                  <Button
                    btn_text={"Proceed To Checkout"}
                    addtional_class="!w-full !p-3 !text-md !bg-primary text-primary-foreground"
                    disabled={true}
                    onclick_event={() => {
                      // navigateTo("cart/Checkout");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditShippingAddress;
