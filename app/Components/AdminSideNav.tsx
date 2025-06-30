"use client";
import { BsBank } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { GiTicket } from "react-icons/gi";
import { BsChatDots } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineBorderStyle } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { CgEventbrite } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { AiOutlineAppstore } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "./Button";
import Image from "next/image";

function AdminSideNav({ link }: { link?: string }) {
  const Navigation = useRouter();

  const navList = [
    {
      navName: "DashBoard",
      icon: <AiOutlineAppstore className=" text-3xl pl-3" />,
      navigate: "/admin/dashboard",
    },
    {
      navName: "Products",

      icon: <MdOutlineProductionQuantityLimits className="text-3xl pl-3" />,
      navigate: "/admin/product",
    },
    {
      navName: "Orders",
      icon: <HiOutlineClipboardList className="text-3xl pl-3" />,
      navigate: "/admin/orders",
    },
    {
      navName: "Transaction",
      icon: <BsBank className="text-3xl pl-3" />,
      navigate: "/admin/transactions",
    },
    {
      navName: "Sales",
      icon: <GiTicket className="text-3xl pl-3" />,
      navigate: "",
      comingSoon: "coming soon",
    },
  ];
  return (
    <>
      <div className="w-full max-w-[250px] h-screen flex flex-col px-3 justify-between bg-black max-lg:hidden">
        <div>
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
          <div className="mt-4">
            {navList.map((loop, index) => (
              <div
                className=" py-1  cursor-pointer flex flex-col justify-around "
                key={index}
              >
                <Link href={loop.navigate}>
                  <div>
                    <div className="">
                      <div
                        className={`w-full font-bold rounded-xl text-primary-foreground text-sm  flex hover:bg-zinc-100/10 flex-row py-2 items-center gap-3   ${
                          link === loop.navigate ? "bg-zinc-100/10 " : ""
                        }`}
                      >
                        <div className="surface-text">{loop.icon}</div>
                        <div className=" max-lg:hidden surface-text">
                          {loop.navName}
                        </div>
                        <div className="flex  mt-3 ml-4  text-zinc-300/50">
                          <span className="text-xs">{loop.comingSoon}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='"h-[60px] pt-8  cursor-pointer  "'>
          <Link href={"/admin/settings"}>
            <div className="h-[40px] flex items-center gap-3  rounded text-sm font-bold surface-text">
              <div className="pl-3">
                <AiOutlineSetting className="text-xl" />
              </div>
              <div className=" max-lg:hidden surface-text">Settings</div>
            </div>
          </Link>
          <div className="h-[40px] flex items-center gap-3  rounded text-sm font-bold  surface-text">
            <div className="pl-3">
              <CgLogOut className="text-xl" />
            </div>
            <div
              className=" max-lg:hidden surface-text"
              onClick={() => {
                //   localStorage.clear("token");
                setTimeout(() => {
                  Navigation.push("/");
                }, 5000);
              }}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSideNav;
