import { BiChat } from "react-icons/bi";
import { AiTwotoneBell } from "react-icons/ai";
import React from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import CustomInput from "./CustomInput";
import { HiUser } from "react-icons/hi";

function AdminNavBar({ Title }: { Title: string }) {
  return (
    <>
      <div className="flex items-center justify-between py-1">
        <div className="flex gap-1 items-center">
          <AiOutlineAppstore className=" text-2xl " />
          <div className="font-semibold max-lg:text-base text-lg">{Title}</div>
        </div>

        <div className="max-lg:hidden">
          <CustomInput
            placeholder="serach"
            addtional_class="!w-[500px] !hidden"
            input_type="text"
          />
        </div>
        <div className="flex gap-3">
          <AiTwotoneBell className="text-2xl font-semibold" />
          <BiChat className="text-2xl font-semibold" />
          <HiUser className="text-2xl font-semibold" />
        </div>
      </div>
    </>
  );
}

export default AdminNavBar;
