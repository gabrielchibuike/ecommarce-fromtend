"use client";
import React from "react";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookF, FaSnapchatGhost } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
// import CustomInput from "./CustomInput";
// import { BsSend } from "react-icons/bs";
// import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
// import { BsFillTelephoneFill } from "react-icons/bs";
// import { FaFacebookF, FaSnapchatGhost } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";

function Footer() {
  return (
    <>
      <div className="w-full h-auto mt-16  bg-primary">
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 max-lg:px-5 max-sm:justify-items-start  px-11 py-5 lg:justify-items-center ">
          <div className="p-5 max-lg:p-1 max-lg:py-5">
            <div className="font-bold text-2xl text-white max-lg:text-xl">
              Konnect
            </div>
            <div>
              <p className="text-zinc-300 text-sm font-medium pt-2">
                {" "}
                Lorem ipsum dolor, sit amet consectetur laborum odit. Dolorum
                molestias dicta consequatur suscipit, aut quas placeat?
              </p>
            </div>
            <div className="text-white pt-10">
              <div className="text-base  font-bold text-white">
                Follow Us On
              </div>
              <div className="flex gap-5 pt-1 max-lg:gap-2 my-3">
                <div className="w-auto h-auto bg-white/15 rounded-full p-3 cursor-pointer">
                  <FaFacebookF />
                </div>
                <div className="w-auto h-auto bg-white/15 rounded-full p-3 cursor-pointer">
                  <AiOutlineTwitter />
                </div>
                <div className="w-auto h-auto bg-white/15 rounded-full p-3 cursor-pointer">
                  <AiOutlineInstagram />
                </div>
                <div className="w-auto h-auto bg-white/15 rounded-full p-3 cursor-pointer">
                  <FaSnapchatGhost />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1 p-5 max-lg:p-1 max-lg:py-5 ">
            <div className="font-bold text-base text-white">Categories</div>
            <div className="pt-5 space-y-2 cursor-pointer ">
              <div className="text-zinc-300 text-sm font-medium ">
                Development & IT
              </div>
              <div className="text-zinc-300 text-sm font-medium">
                Accounting & Financing{" "}
              </div>
              <div className="text-zinc-300 text-sm font-medium">
                Design & Creative
              </div>
              <div className="text-zinc-300 text-sm font-medium">Marketing</div>
              <div className="text-zinc-300 text-sm font-medium">
                Enginnering
              </div>
              <div className="text-zinc-300 text-sm font-medium">Educator</div>
            </div>
          </div>
          <div className="space-y-1 pt-5 max-lg:p-1  max-lg:py-5">
            <div className="space-y-2">
              <h1 className="font-bold text-base text-white">
                Our Information
              </h1>
              <div className="text-zinc-300 text-sm font-medium pt-2 flex gap-2 items-center">
                <p> privacy policy</p>
              </div>
              <div className="text-zinc-300 text-sm font-medium flex gap-2 items-center">
                <p>Terms and condition</p>
              </div>
            </div>
          </div>
          <div className="space-y-1 pt-5 max-lg:p-1  max-lg:py-5">
            <div className="space-y-2">
              <h1 className="font-bold text-base text-white">Contact Us</h1>
              <div className="text-zinc-300 text-sm font-medium pt-2 flex gap-2 items-center">
                <BsFillTelephoneFill className="text-yellow-bg-yellow-600" />
                <p> +234 814-139-3379</p>
              </div>
              <div className="text-zinc-300 text-sm font-medium flex gap-2 items-center">
                <MdOutlineMailOutline className="text-yellow-bg-yellow-600" />
                <p> Konnect@gmail.com</p>
              </div>
            </div>
          </div>
          {/* <div className="space-y-1 p-5 max-lg:p-1 max-lg:py-5">
            <div className="space-y-2">
              <h1 className="font-bold text-base text-yellow-600">
                Subscribe to our newsletter
              </h1>
              <div className="space-y-5">
                <div className="text-zinc-400 text-sm font-medium pt-2 flex gap-2 items-center">
                  We'll keep you updated with the best new jobs.
                </div>
                <div className=" text-sm font-medium flex gap-2 items-center relative">
                  <CustomInput
                    input_type=""
                    name=""
                    placeholder="Enter your email"
                  />
                  <div className="absolute right-3 top-[23px]">
                    <BsSend className="text-lg text-yellow-bg-yellow-600 cursor-pointer text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="px-11">
          <div className="text-white h-20 px-20 max-lg:px-4 flex justify-center items-center  border-white/20 border-t ">
            <p className="text-sm text-zinc-400 ">
              {" "}
              <span className="text-lg">@</span> 2022 konnect Right Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
