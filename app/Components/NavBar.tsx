"use client";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { CgSearchLoading } from "react-icons/cg";
import { HiUser } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import React, { useContext, useRef } from "react";
import CustomInput from "./CustomInput";
import Image from "next/image";
import { ContextApi } from "../GlobalState/Context";
import { useRouter } from "next/navigation";

function NavBar() {
  const { toggleSideNav } = useContext(ContextApi);
  const menu = useRef<HTMLDivElement>(null);
  const route = useRouter();

  function viewMenu() {
    toggleSideNav.current?.classList.replace("hidden", "block");
    setTimeout(() => {
      toggleSideNav.current?.classList.replace(
        "translate-x-full",
        "translate-x-0"
      );
    }, 300);
  }
  return (
    <>
      <nav className="w-full h-16 ">
        <ul className="w-full flex items-center bg-white  py-1 px-20 max-lg:px-2 justify-between fixed  top-0 left-0  z-50">
          <div className=" flex items-center gap-1">
            <Image
              alt=""
              src={"/DC.png"}
              width={100}
              height={100}
              className="contain w-12  max-lg:w-10 max-lg:h-10"
            />
            <Image
              alt=""
              src={"/text.png"}
              width={100}
              height={100}
              className="contain w-20  max-lg:w-20 "
            />
          </div>

          <div className="text-sm font-medium flex items-center gap-6 cursor-pointer max-lg:hidden">
            <div className="flex items-center gap-1 hover:text-yellow-600">
              <div>Category</div>
              <IoIosArrowDown />
            </div>
            <div className="hover:text-yellow-600">
              <div>Best Selling Items</div>
            </div>
            <div className="hover:text-yellow-600">
              <div>New Arrival</div>
            </div>
            <div className="hover:text-yellow-600">
              <div>Trending</div>
            </div>
          </div>

          <div className="max-lg:hidden">
            <CustomInput
              placeholder="serach"
              addtional_class="!w-[400px]"
              name="search"
              input_type="text"
            />
          </div>

          <div className="flex gap-8 max-lg:gap-3 items-center cursor-pointer ">
            <div className="flex gap-1 items-center hover:text-yellow-600 lg:hidden">
              <CgSearchLoading className="text-2xl font-semibold " />
            </div>
            <div className="flex gap-1 items-center hover:text-yellow-600 max-lg:hidden">
              <HiUser className="text-xl font-medium" />
              <p className="font-medium  text-sm">Account</p>
            </div>
            {/* <div className="flex gap-1 items-center hover:text-yellow-600 max-lg:hidden">
              <BiHelpCircle className="text-xl font-semimfont-medium " />
              <p className="font-medium ">help</p>
            </div> */}

            <div
              className="flex gap-1 items-center hover:text-yellow-600"
              onClick={() => {
                route.push("/cart");
              }}
            >
              <AiOutlineShoppingCart className="text-xl font-medium" />
              <p className="font-medium max-lg:hidden text-sm">Cart</p>
            </div>

            <div onClick={viewMenu}>
              <div
                className="hidden max-lg:text-2xl  gap-1 items-center max-lg:block"
                ref={menu}
              >
                <BiMenu />
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
