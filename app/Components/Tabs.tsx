"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { GiTicket } from "react-icons/gi";

function Tabs({ link }: { link?: string }) {
  const MobileNavList = [
    {
      navName: "DashBoard",
      icon: <AiOutlineAppstore className=" text-2xl" />,
      navigate: "/dashboard",
    },
    {
      navName: "Products",
      icon: <MdEventAvailable className="text-2xl " />,
      navigate: "/recently-added",
    },
    {
      navName: "Orders",
      icon: <HiOutlineClipboardList className="text-2xl " />,
      navigate: "/bookings",
    },
    {
      navName: "Transactions",
      icon: <CgProfile className="text-2xl " />,
      navigate: "/settings",
    },
  ];
  return (
    <>
      <div className="w-full h-[60px] bg-black  fixed bottom-0   hidden max-lg:block">
        <div className="w-full h-[60px] bg-black  ">
          <div className="h-[60px] flex justify-between items-center px-2">
            {MobileNavList.map((loop, index) => (
              <div className="" key={index}>
                <Link href={loop.navigate}>
                  <div
                    className={` flex flex-col items-center   ${
                      link == loop.navigate
                        ? "text-yellow-600"
                        : "text-zinc-300"
                    }`}
                    key={index}
                  >
                    <div className=" ">{loop.icon}</div>
                    <div className={`text-[10px] font-medium  `}>
                      {loop.navName}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabs;
