import Link from "next/link";
import React from "react";
import Card from "./Card";
import { products } from "../Constants/data";

function Products() {
  return (
    <>
      <div className=" mt-2 grid grid-cols-5 max-lg:grid-cols-2 gap-2">
        {products.map((ele, i) => (
          <Link href={`/${ele.title}`} key={i}>
            <Card additionalClass="!w-full  cursor-pointer !p-0 !min-h-[200px] !bg-transparent">
              <div className="w-full h-[200px] rounded-md  bg-zinc-300">
                {/* <Image
                src={"/headphone.jpg"}
                alt=""
                width={100}
                height={100}
                className="contain w-[200px]"
              /> */}
              </div>
              <div className="flex items-center py-2 justify-between">
                <div className="">
                  <h1 className="w-44 max-lg:w-36 text-sm font-bold text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
                    {ele.title}
                  </h1>
                  <p className="text-xs font-semibold text-yellow-600">
                    {ele.price}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Products;
