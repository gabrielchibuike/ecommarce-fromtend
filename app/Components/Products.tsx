import Link from "next/link";
import React from "react";
import Card from "./Card";
// import { products } from "../Constants/data";

import Image from "next/image";

function Products({ products }: any) {
  return (
    <>
      <div className=" mt-2 grid grid-cols-5 max-xl:grid-cols-3 max-md:grid-cols-2 gap-2">
        {products &&
          products.map((product: any, i: number) => (
            <Link href={`/${product._id}`} key={i}>
              <Card additionalClass="!w-full max-w-[230px] max-xl:!max-w-full cursor-pointer !p-0 !min-h-[200px] !bg-transparent">
                <div className="w-full h-[200px]  max-lg:h-[170px] rounded-lg flex justify-center bg-zinc-300 object-cover transition-all duration-300 ease-in-out hover:scale-105">
                  <Image
                    src={product.product_image[0]}
                    alt=""
                    width={500}
                    height={500}
                    className="contain w-full h-[200px] "
                  />
                </div>
                <div className="flex items-center py-2 px-1 justify-between">
                  <div className="">
                    <h1 className="w-44 max-lg:w-36 text-sm font-bold text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
                      {product.product_name}
                    </h1>
                    <p className="text-xs font-semibold text-yellow-600">
                      {product.price}
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
