import { BsPhoneVibrate } from "react-icons/bs";
import { BsFillHandbagFill } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { GiPoloShirt } from "react-icons/gi";
import Link from "next/link";
import React from "react";
import Card from "./Card";

function ItemCategories() {
  return (
    <>
      <div className="w-full px-20 py-4 space-y-4 max-lg:py-2 max-lg:px-1">
        <div className="font-bold text-lg">Shop Our Top Categories</div>
        <div className="w-full  flex items-center gap-4">
          <Link href={"/men-fashion"} className="">
            <Card additionalClass="!w-[150px] !min-h-[170px] max-lg:!min-h-[30px] ">
              <div></div>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ItemCategories;
