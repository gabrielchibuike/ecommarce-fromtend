import AdminNavBar from "@/app/Components/AdminNavBar";
import AdminSideNav from "@/app/Components/AdminSideNav";
import Card from "@/app/Components/Card";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function page() {
  return (
    <>
      <div className="flex">
        <AdminSideNav link={"/admin/dashboard"} />
        <div className="w-full h-screen bg-zinc-200/20 px-3">
          <AdminNavBar Title="DashBoard" />

          <div className="flex gap-3 items-center py-3 max-lg:overflow-x-scroll">
            <div className="flex gap-3">
              <Card additionalClass="!w-[270px] !min-h-[110px]">
                <div></div>
              </Card>
              <Card additionalClass="!w-[270px] !min-h-[110px]">
                <div></div>
              </Card>
            </div>
            <div className="flex gap-3">
              <Card additionalClass="!w-[270px] !min-h-[110px]">
                <div></div>
              </Card>
              <Card additionalClass="!w-[270px] !min-h-[110px]">
                <div></div>
              </Card>
            </div>
          </div>
          <div className="flex gap-3 w-full max-lg:flex-col">
            <div className="w-full space-y-2">
              <Card additionalClass="!w-full !min-h-[200px]">
                <div></div>
              </Card>
              <Card additionalClass="!w-full !min-h-[200px]">
                <div></div>
              </Card>
            </div>

            <div className="w-full">
              <Card additionalClass="!w-full !min-h-[410px]">
                <div></div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
