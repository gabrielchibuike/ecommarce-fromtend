"use client";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { CgSearchLoading } from "react-icons/cg";
import { HiUser } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import React, { useContext, useRef, useState } from "react";
import CustomInput from "./CustomInput";
import Image from "next/image";
import { ContextApi } from "../GlobalState/Context";
import { useRouter } from "next/navigation";
import NavigationMenu from "./NavigationMenu";
import NavNotification from "./NavNotification";

function NavBar() {
  const { toggleSideNav } = useContext(ContextApi);
  const menu = useRef<HTMLDivElement>(null);
  const route = useRouter();
  const toggleElement = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function viewMenu() {
    toggleSideNav.current?.classList.replace("hidden", "block");
    setTimeout(() => {
      toggleSideNav.current?.classList.replace(
        "translate-x-full",
        "translate-x-0"
      );
    }, 300);
  }

  // function hoverMenu() {
  //   toggleElement.current?.classList.replace("hidden", "block");
  // }
  return (
    <>
      <nav className="w-full h-fit bg-white flex flex-col   max-lg:h-12 fixed right-0 left-0  z-50 ">
        {/* <NavNotification /> */}
        <ul className="w-full flex items-center bg-whit   py- px-10 max-lg:px-1 justify-between    ">
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

          <div className="text-sm font-semibold flex items-center gap-5 cursor-pointer max-xl:hidden">
            <div
              className="flex items-center gap-1 hover:text-yellow-600"
              onMouseEnter={() => {
                setIsOpen(true);
              }}
              onMouseLeave={(e) => {
                if (!toggleElement.current?.contains(e.relatedTarget as Node)) {
                  setIsOpen(false);
                }
              }}
            >
              <div>Shop</div>
              <IoIosArrowDown />
            </div>
            <div className="hover:text-yellow-600">
              <Link href={"/BestSelling"}>
                <div>Best Selling Items</div>
              </Link>
            </div>
            <div className="hover:text-yellow-600">
              <Link href={"/NewArrival"}>
                <div>New Arrival</div>
              </Link>
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

          <div className="flex gap-3 justify-end max-lg:gap-3 items-center cursor-pointer ">
            <div className="flex gap-1 items-center hover:text-yellow-600 lg:hidden">
              <CgSearchLoading className="text-2xl font-semibold " />
            </div>
            <div className="flex gap-1 items-center hover:text-yellow-600 max-lg:hidden">
              <HiUser className="text-xl font-medium" />
              <p className="font-medium  text-sm">Account</p>
            </div>
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
                className="hidden max-lg:text-2xl  gap-1 items-center max-xl:block"
                ref={menu}
              >
                <BiMenu />
              </div>
            </div>
          </div>
        </ul>
      </nav>

      <NavigationMenu
        toggleElement={toggleElement}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

export default NavBar;
