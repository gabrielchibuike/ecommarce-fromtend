"use client";

import { IoIosArrowForward } from "react-icons/io";
import { FaHandsHelping } from "react-icons/fa";
import { useContext, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ContextApi } from "../GlobalState/Context";
const routesArray = [
  {
    routes: "/jobs",
    routes_text: "Jobs",
  },
  {
    routes: "/companies",
    routes_text: "Companies",
  },
  {
    routes: "/employer",
    routes_text: "Post Job/Employers",
  },
  {
    routes: "/privacy",
    routes_text: "pravacy",
  },
  {
    routes: "/help",
    routes_text: "Help",
  },
];

function SideNav() {
  const { toggleSideNav } = useContext(ContextApi);
  //   const direct = useNavigate();

  //   const toggleSideNav = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setTimeout(() => {
      toggleSideNav.current?.classList.replace("block", "hidden");
    }, 300);
    toggleSideNav.current?.classList.replace(
      "translate-x-0",
      "translate-x-full"
    );
    // document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      <section className="w-full">
        <div
          className="w-full  fixed bg-white top-0 left-0  transition translate-x-full ease-linear hidden  text-black h-full z-50  lg:hidden p-3"
          ref={toggleSideNav}
        >
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="w-7 h-7 bg-blue-700 rounded-md flex justify-center items-center">
                <FaHandsHelping className="text-2xl text-white" />
              </div>
              <div className="font-bold text-xl text-blue-700 ">Konnect</div>
            </div>
            <div
              className="cursor-pointer max-lg:text-2xl "
              onClick={closeMenu}
            >
              <AiOutlineClose />
            </div>
          </div>
          <div className="mt-4 ">
            {routesArray.map((routesArray, index) => (
              <Link href={routesArray.routes} key={index}>
                <div
                  className={`flex justify-between max-lg:text-sm font-medium text-zinc-500 py-3 border-b-[1px] border-zinc-300`}
                >
                  {routesArray.routes_text}
                  <IoIosArrowForward className="text-lg text-zinc-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SideNav;
