"use client";

import AdminNavBar from "@/app/Components/AdminNavBar";
import AdminSideNav from "@/app/Components/AdminSideNav";
import Button from "@/app/Components/Button";
import CustomTable from "@/app/Components/CustomProductTable";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { fetchProducts } from "@/utils/productFetchApi";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { IoIosArrowBack, IoIosMenu } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { TbLayoutGrid } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { productPayload } from "@/app/GlobalState/store";
import Image from "next/image";
import Tabs from "@/app/Components/Tabs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

function page() {
  const { navigateTo } = useCustomRouter();
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => fetchProducts(),
    queryKey: ["products"],
    staleTime: 1 * 60000,
  });

  return (
    <>
      <div className="flex">
        <AdminSideNav link={"/admin/product"} />
        <div className="w-full h-screen bg-zinc-200/40 px-3 max-lg:px-2 py-2">
          <div
            className="flex gap-1 font-bold items-center lg:hidden text-yellow-600 text-base cursor-pointer"
            onClick={() => navigateTo("/admin/product")}
          >
            <IoIosArrowBack />
            <span className=" text-sm">Back</span>
          </div>
          <AdminNavBar Title="Add Products" />
          {products && products.length === 0 ? (
            <div className="w-full h-[70%] flex items-center justify-center flex-col">
              <Image
                src={"/cart_icon.png"}
                width={200}
                height={200}
                className="cover "
                alt=""
              />
              <div className="flex flex-col justify-center space-y-3">
                <h1 className="text-lg font-semibold font-[poppins]">
                  Product List Is Empty
                </h1>
                <Button
                  btn_text={"Add Product"}
                  addtional_class="!rounded-2xl"
                  onclick_event={() => {
                    navigateTo("/admin/product/addProduct");
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <div className="flex items-center justify-end py-2 gap-4">
                    <Button
                      btn_text={"Add Product"}
                      addtional_class="!rounded-lg max-lg:hidden"
                      onclick_event={() => {
                        navigateTo("/admin/product/addProduct");
                      }}
                    />
                    <div className="flex gap-2 items-center">
                      <IoIosMenu className="text-xl cursor-pointer" />
                      <TbLayoutGrid className="text-xl cursor-pointer" />
                      <BiMenuAltRight className="text-xl cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <CustomTable products={products} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <div
          className="w-[50px] h-[50px] bg-yellow-500 rounded-full fixed bottom-20 right-3 lg:hidden flex justify-center items-center"
          onClick={() => navigateTo("/admin/product/addProduct")}
        >
          <MdOutlineProductionQuantityLimits className="text-2xl text-white" />,
        </div>
      </div>
      <Tabs />
    </>
  );
}

export default page;
