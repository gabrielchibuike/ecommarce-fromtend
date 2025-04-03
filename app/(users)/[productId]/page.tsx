"use client";
import { MdVerified } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import Card from "@/app/Components/Card";
import Footer from "@/app/Components/Footer";
import NavBar from "@/app/Components/NavBar";
import React, { useEffect, useState } from "react";
import Button from "@/app/Components/Button";
import Products from "@/app/Components/Products";
import SideNav from "@/app/Components/SideNav";
import { useSelector } from "react-redux";
import AdminSideNav from "@/app/Components/AdminSideNav";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import AdminNavBar from "@/app/Components/AdminNavBar";
import Image from "next/image";
import { domain } from "@/api/client";
import { productType } from "@/interface/productType";
import useCustomRouter from "@/app/hooks/useCustomRouter";

function page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = React.use(params);
  console.log(productId);

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

  // const tokenpayload = useSelector(
  //   (state: any) => state.getTokenResult.value.tokenPayload
  // );

  // useEffect(() => {
  //   console.log(tokenpayload);
  // }, []);
  return (
    <>
      <div>
        <NavBar />
        <SideNav />
        {product &&
          product.map((product, i) => (
            <div className="px-20 py-5 max-lg:px-2" key={i}>
              <div className="flex gap-5 max-lg:flex-col">
                <div className="w-full flex gap-3">
                  <div className="w-24 h-[300px] overflow-y-scroll cursor-pointer  flex gap-1 flex-col max-lg:hidden p-1">
                    {product.product_image.map((img, i) => (
                      <div className="w-full h-20  rounded-lg" key={i}>
                        <Image
                          src={img}
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
                    <div className="w-full h-[300px] bg-zinc-400/30">
                      <Image
                        src={
                          previewOneImg
                            ? previewOneImg
                            : product.product_image[0]
                        }
                        width={200}
                        height={200}
                        className="object-contain h-[300px] w-full"
                        alt=""
                      />
                    </div>
                    <div className="w-24 overflow-y-scroll cursor-pointer  max-lg:w-full max-lg:min-h-20 flex gap-1 lg:hidden pt-6">
                      {product.product_image.map((img, i) => (
                        <div className="w-full h-16  rounded-lg" key={i}>
                          <Image
                            src={product.product_image[0]}
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
                  <h1 className="text-xl font-semibold">
                    {product.product_name}
                  </h1>
                  <div className="flex  items-center py-1">
                    <TbCurrencyNaira className="text-xl" />
                    <h2 className="text-xl font-bold">{product.price}</h2>
                  </div>
                  {/* <div className="flex gap-2 items-center py-1 max-lg:py-2">
                    <div className="flex gap-1">
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                    </div>

                    <div className="text-sm">
                      (5)Reviews |{" "}
                      <span className="cursor-pointer font-semibold text-yellow-600">
                        {" "}
                        Add Reviews
                      </span>
                    </div>
                  </div> */}
                  <div className="flex items-center gap-1 py-1">
                    {product.status === "Avaliable" ? (
                      <MdVerified className="text-green-600" />
                    ) : (
                      <IoMdClose className="text-red-600" />
                    )}
                    <p
                      className={`text-xs font-semibold  text-green-600 ${
                        product.status !== "Avaliable" && "text-red-600"
                      }`}
                    >
                      {product.status === "Avaliable"
                        ? "  Avaliable in stock"
                        : "Not in stock"}
                    </p>
                  </div>
                  <div className="flex max-lg:flex-col lg:items-center py-2 gap-6 max-lg:gap-3">
                    <div
                      className={`space-y-1 max-lg:space-y-0 ${
                        product.color[0] == "others" && "hidden"
                      }`}
                    >
                      <h1 className="text-sm font-semibold">Color:</h1>
                      <div className="flex gap-1">
                        {product.color.map((color, i) => (
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
                      {product.size.length > 0 && (
                        <div className="space-y-1">
                          <h1 className="text-sm font-semibold">Size:</h1>
                          {product.size.map((size, i) => (
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
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-semibold"> QTY:</span>
                    <div className="flex py-1">
                      <div className="w-8 h-6 bg-black text-white text-xl rounded-l-sm flex items-center justify-center ">
                        -
                      </div>
                      <div className="w-8 h-6 bg-white border border-zinc-600 text-zinc-800  text-xl flex items-center justify-center">
                        0
                      </div>
                      <div className="w-8 h-6 bg-black text-white text-xl rounded-r-rounded-l-sm flex items-center justify-center ">
                        +
                      </div>
                    </div>
                  </div>
                  <div className="py-3 mt-3 max-lg:hidden">
                    <Button
                      btn_text={"ADD TO CART"}
                      addtional_class="max-lg:!w-full"
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
                    PRODUCT DESCRIPTION
                  </div>
                  {product.description}
                </div>
              </div>
              <div className="py-3 mt-3 lg:hidden">
                <Button
                  btn_text={"ADD TO CART"}
                  addtional_class="max-lg:!w-full"
                />
              </div>

              <div>
                <h1 className="font-bold text-sm">RELATED PRODUCTS</h1>
                <Products />
              </div>
            </div>
          ))}
        <Footer />
      </div>
    </>
  );
}

export default page;
