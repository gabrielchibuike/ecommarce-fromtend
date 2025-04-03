import { BsPhoneVibrate } from "react-icons/bs";
import { BsFillHandbagFill } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { GiPoloShirt } from "react-icons/gi";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Card from "./Card";
import Image from "next/image";
import Button from "./Button";

function ItemCategories() {
  const displayBtn = useRef<HTMLDivElement[]>([]);
  const TopCategory = [
    {
      src: "/x.avif",
      alt: "",
      heading1: "clothing",
      paragraph:
        "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus eveniet consequatur obcaecati molestiae aliquid voluptatem sequi.",
    },
    {
      src: "/bag.avif",
      alt: "",
      heading1: "Bags",
      paragraph:
        "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus eveniet consequatur obcaecati molestiae aliquid voluptatem sequi.",
    },
    {
      src: "/shoe.avif",
      alt: "",
      heading1: "Shoes",
      paragraph:
        "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus eveniet consequatur obcaecati molestiae aliquid voluptatem sequi.",
    },
  ];

  // useEffect(()=>{

  // },[])
  return (
    <>
      <div className="w-full px-10 py-4 space-y-4  max-lg:px-1 my-11 max-lg:my-2">
        <div className="text-3xl font-semibold max-lg:text-base">
          Shop Our Top Categories
        </div>

        <div className="w-full  flex items-center gap-4 overflow-x-scroll ">
          <Link href={"#"} className="flex gap-3 w-full ">
            {TopCategory.map((ele, i) => (
              <div
                className="relative"
                key={i}
                onMouseEnter={() => {
                  displayBtn.current?.forEach((ele, _) => {
                    ele.classList.replace("block", "hidden");
                  });
                  displayBtn.current[i].classList.replace("hidden", "block");
                }}
                onMouseLeave={(e) => {
                  displayBtn.current?.forEach((ele, _) => {
                    ele.classList.add("hidden");
                  });
                  displayBtn.current[i].classList.replace("block", "hidden");
                }}
              >
                <Card additionalClass="!w-[412px] !min-h-[450px] max-lg:!min-h-[140px] !p-0 max-lg:!w-[150px] flex-shrink-0">
                  <Image
                    src={ele.src}
                    width={500}
                    height={500}
                    alt={ele.alt}
                    className="w-full  max-lg:object-cover rounded-xl"
                  />
                </Card>
                <div
                  className="w-full absolute  bottom-0 px-4 max-lg:hidden py-2 hidden"
                  ref={(ele: HTMLDivElement) => {
                    displayBtn.current[i] = ele;
                  }}
                >
                  <Button
                    btn_text={"SHOP NOW"}
                    addtional_class="!w-full !h-[50px] max-lg:!h-[30px] !bg-white !text-[#1d0505]"
                  />
                </div>
              </div>
            ))}
          </Link>
        </div>
      </div>
    </>
  );
}

export default ItemCategories;
