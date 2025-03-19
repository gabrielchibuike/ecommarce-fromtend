"use client";
import { domain } from "@/api/client";
import { IoMdClose } from "react-icons/io";

import AdminNavBar from "@/app/Components/AdminNavBar";
import AdminSideNav from "@/app/Components/AdminSideNav";
import Button from "@/app/Components/Button";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { productType } from "@/interface/productType";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
// import { products } from "../page";

function page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = React.use(params);

  const [product, setProduct] = useState<productType[]>([]);

  const [previewOneImg, setPreviewOneImg] = useState("");

  const { navigateTo } = useCustomRouter();

  async function getOneProduct() {
    const request = await fetch(
      `${domain}/api/products/get_product/${productId}`
    );

    if (request.ok) {
      const result = await request.json();
      console.log(result);

      setProduct([result]);
    } else {
      console.log("somrthing went wrong");
    }
  }

  // console.log(product);
  useEffect(() => {
    getOneProduct();
  }, []);

  return (
    <div className="flex">
      <AdminSideNav link={"/admin/product"} />
      <div className="w-full min-h-screen bg-zinc-200/40 px-3 max-lg:px-2 py-2">
        <div
          className="flex gap-1 font-bold items-center text-yellow-600 text-base"
          onClick={() => navigateTo("/admin/product")}
        >
          <IoIosArrowBack />
          <span className=" text-sm">Back</span>
        </div>
        {product[0] && <AdminNavBar Title={`${product[0].product_name}`} />}
        {product &&
          product.map((item, i) => (
            <div className="px-5 py-5 max-lg:px-2" key={i}>
              <div className="flex gap-5 max-lg:flex-col">
                <div className="w-full flex gap-3">
                  <div className="w-24 h-[300px] overflow-y-scroll cursor-pointer  flex gap-1 flex-col max-lg:hidden p-1">
                    {item.product_image.map((img, i) => (
                      <div className="w-full h-20  rounded-lg" key={i}>
                        <Image
                          src={`${domain}/${img}`}
                          width={200}
                          height={200}
                          className="object-cover w-full h-16 "
                          alt=""
                          onClick={() => {
                            setPreviewOneImg(img);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="w-full">
                    <div className="w-full min-h-[300px] bg-zinc-400">
                      <Image
                        src={
                          previewOneImg
                            ? `${domain}/${previewOneImg}`
                            : `${domain}/${item.product_image[0]}`
                        }
                        width={200}
                        height={200}
                        className="object-cover w-full h-[300px] "
                        alt=""
                      />
                    </div>
                    <div className="w-24 overflow-y-scroll cursor-pointer  max-lg:w-full max-lg:min-h-20 flex gap-1 lg:hidden pt-6">
                      {item.product_image.map((img, i) => (
                        <div className="w-full h-16  rounded-lg" key={i}>
                          <Image
                            src={`${domain}/${img}`}
                            width={200}
                            height={200}
                            className="object-cover w-full h-16 "
                            alt=""
                            onClick={() => {
                              setPreviewOneImg(img);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full ">
                  <h1 className="text-xl font-semibold">{item.product_name}</h1>
                  <div className="flex  items-center py-1">
                    <TbCurrencyNaira className="text-xl" />
                    <h2 className="text-lg font-semibold">{item.price}</h2>
                  </div>
                  <div className="flex items-center gap-1 py-1">
                    {item.status === "Avaliable" ? (
                      <MdVerified className="text-green-600" />
                    ) : (
                      <IoMdClose className="text-red-600" />
                    )}
                    <p
                      className={`text-xs font-semibold  text-green-600 ${
                        item.status !== "Avaliable" && "text-red-600"
                      }`}
                    >
                      {item.status === "Avaliable"
                        ? "  Avaliable in stock"
                        : "Not in stock"}
                    </p>
                  </div>
                  <div className="flex max-lg:flex-col lg:items-center py-2 gap-6 max-lg:gap-3">
                    <div
                      className={`space-y-1 max-lg:space-y-0 ${
                        item.color[0] == "others" && "hidden"
                      }`}
                    >
                      <h1 className="text-sm font-semibold">Color:</h1>
                      <div className="flex gap-1">
                        {item.color.map((color, i) => (
                          <div key={i}>
                            <div
                              style={{
                                width: "32px",
                                height: "24px",
                                backgroundColor: `${color}`,
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="space-y-1">
                        <h1 className="text-sm font-semibold">Size:</h1>
                        {item.size.map((size, i) => (
                          <div
                            className="flex gap-2 cursor-pointer font-medium text-sm"
                            key={i}
                          >
                            <div className="w-8 h-6 border border-zinc-800/30 text-center text-sm">
                              {size}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className=" py-2 flex gap-6 max-lg:space-between items-center">
                    <div className="text-sm font-semibold">
                      {" "}
                      Category:
                      <p className="text-zinc-800 ">{item.product_category}</p>
                    </div>
                    <div className="text-sm font-semibold">
                      {" "}
                      Sub-category:
                      <p className="text-zinc-800 ">{item.sub_category}</p>
                    </div>
                  </div>
                  <div className=" py-2 flex gap-6 max-lg:space-between items-center">
                    <div className="text-sm font-semibold">
                      {" "}
                      Qty in stock:
                      <p className="text-zinc-800 ">{item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold">
                      {" "}
                      Brand:
                      <p className="text-zinc-800 ">
                        {item.manufacturer_brand}
                      </p>
                    </div>
                  </div>
                  <div className=" mt-1 max-lg:hidden">
                    <Button
                      btn_text={"Edit Item"}
                      addtional_class="max-lg:!w-full"
                      onclick_event={() =>
                        navigateTo(`/admin/product/editProduct/${productId}`)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex  gap-4 py-10 max-lg:py-2 ">
                <div className="w-[200px] min-h-10 space-y-1 border border-zinc-500/20 max-lg:hidden">
                  <div className=" text-xs py-2 font-semibold px-2 text-yellow-600">
                    PRODUCT DESCRIPTION
                  </div>
                  <div className="bg-zinc-400/10 text-xs py-2  font-semibold px-2 ">
                    CUSTOMER REVIEWS
                  </div>
                </div>
                <div className="w-[700px] text-zinc-600 text-sm font-medium border-t border-zinc-500/20">
                  <div className=" text-xs py-2 font-semibold  text-yellow-600 lg:hidden">
                    Product description
                  </div>
                  {item.description}
                </div>
              </div>
              <div className="py-3 mt-3 lg:hidden max-lg:hidden">
                <Button
                  btn_text={"ADD TO CART"}
                  addtional_class="max-lg:!w-full"
                />
              </div>
              <div className="py-3 mt-3 lg:hidden ">
                <Button
                  btn_text={"Edit item"}
                  addtional_class="max-lg:!w-full"
                />
              </div>

              {/* <div>
            <h1 className="font-bold text-sm">RELATED PRODUCTS</h1>
            <Products />
          </div> */}
            </div>
          ))}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default page;
