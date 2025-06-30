"use client";
import { AiOutlineClose } from "react-icons/ai";
import AdminNavBar from "@/app/Components/AdminNavBar";
import AdminSideNav from "@/app/Components/AdminSideNav";
import Button from "@/app/Components/Button";
import CustomInput from "@/app/Components/CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/Components/CustomSelect";
import React, { useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/utils/productFetchApi";
import { ToastComponent } from "@/app/Components/Toast";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import {
  Colors,
  productCategory,
  Sizes,
  Status,
} from "@/app/Constants/inputsOptions";
import { schema } from "@/utils/validationSchema";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AddProducts() {
  const { navigateTo } = useCustomRouter();
  const styleInput = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [selectedImage, setSelectedImage] = useState<File>();

  const [product_category, setProduct_category] = React.useState<string>("");

  const [color, setColor] = React.useState<string[]>([]);

  const [size, setSize] = React.useState<string[]>([]);

  const [status, setStatus] = React.useState<string>("");

  const queryClient = useQueryClient();

  const [toastData, setToastData] = useState({
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  type FormValues = z.infer<typeof schema>;

  function removeSeletedItem(item: string, role: string) {
    if (role === "color") {
      setColor(color.filter((ele) => ele !== item));
    }
    setSize(size.filter((ele) => ele !== item));
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    }
  };

  function removeSeletedImg(file: File) {
    setSelectedFiles(selectedFiles.filter((ele) => ele !== file));
  }

  const { mutateAsync: formMutation } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log(data.data);
      setToastData({
        description: data.message,
      });
      setIsOpen(true);

      // when form is submitted, reset the form
      setSelectedFiles([]);
      setSelectedImage(undefined);
      setColor([]);
      setSize([]);
      reset();
    },
    onError: (error) => {
      setToastData({
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        description: error?.message!,
      });
      setIsOpen(true);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formInfo = {
      product_name: data.productName,
      product_category: product_category,
      sub_category: data.subCategory,
      manufacturer_brand: data.manufacturarBrand,
      description: data.description,
      color: color,
      size: size,
      status: status,
      quantity: data.stockQuantity,
      price: data.price,
      discount: data.discount,
    };

    const formData = new FormData();
    formData.append("jsonData", JSON.stringify(formInfo));

    Array.from(selectedFiles!).map((file) => {
      formData.append("files", file);
    });

    if (selectedFiles!.length === 0) {
      setToastData({
        description: "image field cannot be empty",
      });
      setIsOpen(true);
    }

    await formMutation({ formData });
  };

  return (
    <>
      <div className="flex">
        <AdminSideNav link={"/admin/product"} />
        <div className="w-full h-screen  bg-zinc-200/40 px-3 max-lg:px-2 py-2">
          <div
            className="flex gap-1 font-bold items-center text-yellow-600 text-base cursor-pointer"
            onClick={() => navigateTo("/admin/product")}
          >
            <IoIosArrowBack />
            <span className=" text-sm">Back</span>
          </div>
          <AdminNavBar Title="Add Product" />

          <div className="h-[90%] max-lg:h-fit overflow-y-scroll px-1 max-lg:px-0 py-1 ">
            <form
              className="bg-white px-6 max-lg:px-2 py-3 space-y-7  flex-1 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-4 max-lg:flex-col">
                <div className="w-full space-y-4">
                  <div className="flex gap-5 max-lg:flex-col">
                    <div className="w-full">
                      <CustomInput
                        addtional_class="!bg-zinc-200/40"
                        input_type="text"
                        placeholder="Product Name"
                        label="Product Name"
                        // name="productName"
                        register={register("productName")}
                        errors={errors.productName?.message}
                      />
                    </div>
                    <div className="w-full">
                      <div className="text-xs py-1 text-zinc-800 font-bold">
                        Product Category
                      </div>
                      <Select
                        onValueChange={(value) => {
                          setProduct_category(value);
                        }}
                      >
                        <SelectTrigger className="w-full border border-zinc-600/20 bg-zinc-200/40 font-semibold py-5  px-3  text-xs !text-zinc-500 ">
                          <SelectValue placeholder="Add category" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-50 ">
                          {productCategory.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-zinc-500 cursor-pointer"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 max-lg:flex-col">
                    <div className="w-full">
                      <CustomInput
                        addtional_class="!bg-zinc-200/40"
                        input_type="text"
                        placeholder="Sub category"
                        label="Sub Category"
                        register={register("subCategory")}
                        // name="subCategory"
                        errors={errors.subCategory?.message}
                      />
                    </div>
                    <div className="w-full">
                      <CustomInput
                        addtional_class=" !bg-zinc-200/40"
                        input_type="text"
                        placeholder="Manufacturer Brand"
                        label="Manufacturer Brand"
                        register={register("manufacturarBrand")}
                        // name="manufacturarBrand"
                        errors={errors.manufacturarBrand?.message}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="text-xs py-1 font-bold">
                      {"Description"}
                    </label>
                    <textarea
                      className="w-full py-3  px-3  text-xs focus:outline-none  font-semibold rounded-lg border border-zinc-600/20 bg-zinc-200/40"
                      {...register("description")}
                      name="description"
                    ></textarea>
                    {errors.description && (
                      <span className="text-red-400 text-xs font-bold">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-5 max-lg:flex-col">
                    <div className="w-full">
                      <div className="text-xs py-1 text-zinc-800 font-bold">
                        Colors
                      </div>
                      <Select
                        onValueChange={(value) => {
                          setColor((prev) => {
                            return [...prev, value];
                          });
                        }}
                      >
                        <SelectTrigger className="w-full border border-zinc-600/20 bg-zinc-200/40 font-semibold py-5  px-3  text-xs !text-zinc-500">
                          <SelectValue placeholder="Add color" className="" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-50 text-zinc-500">
                          {Colors.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="cursor-pointer"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        {color.map((ele, i) => (
                          <div
                            className="w-fit  mt-3 px-1 py-[2px] flex gap-1 cursor-pointer items-center rounded-xl bg-yellow-600 text-white font-medium text-xs"
                            key={i}
                          >
                            {ele}
                            <div
                              onClick={() => removeSeletedItem(ele, "color")}
                            >
                              <AiOutlineClose />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="text-xs py-1 text-zinc-800 font-bold">
                        Sizes
                      </div>
                      <Select
                        onValueChange={(value) => {
                          setSize((prev) => {
                            return [...prev, value];
                          });
                        }}
                      >
                        <SelectTrigger className="w-full border border-zinc-600/20 bg-zinc-200/40 font-semibold py-5  px-3  text-xs text-zinc-500">
                          <SelectValue placeholder="Select Sizes" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-50 ">
                          {Sizes.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-zinc-500 cursor-pointer"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        {size.map((ele, i) => (
                          <div
                            className="w-fit  mt-3 px-1 py-[2px] flex gap-1 cursor-pointer items-center rounded-xl bg-yellow-600 text-white font-medium text-xs"
                            key={i}
                          >
                            {ele}
                            <div onClick={() => removeSeletedItem(ele, "")}>
                              <AiOutlineClose />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5 max-lg:flex-col">
                    <div className="w-full">
                      <CustomInput
                        addtional_class="!bg-zinc-200/40"
                        input_type="text"
                        placeholder="Stock Quantity"
                        label="Stock Quantity"
                        register={register("stockQuantity")}
                        // name="stockQuantity"
                        errors={errors.stockQuantity?.message}
                      />
                    </div>
                    <div className="w-full">
                      <div className="text-xs py-1 text-zinc-800 font-bold">
                        Status
                      </div>
                      <Select
                        onValueChange={(value) => {
                          setStatus(value);
                        }}
                      >
                        <SelectTrigger className="w-full border border-zinc-600/20 bg-zinc-200/40 font-semibold py-5  px-3  text-xs text-zinc-500">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-50 ">
                          {Status.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-zinc-500 cursor-pointer"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-5 max-lg:flex-col">
                    <div className="w-full">
                      <CustomInput
                        addtional_class=" !bg-zinc-200/40"
                        input_type="text"
                        placeholder="Price"
                        label="Price"
                        register={register("price")}
                        // name="price"
                        errors={errors.price?.message}
                      />
                    </div>
                    <div className="w-full">
                      <CustomInput
                        addtional_class="!bg-zinc-200/40"
                        input_type="text"
                        placeholder="Discount"
                        label="Discount"
                        register={register("discount")}
                        // name="discount"
                        errors={errors.discount?.message}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[50%] max-lg:w-full text-zinc-800">
                  <h1 className="text-xs py-1  font-bold">
                    Select Product Image
                  </h1>
                  <div className="w-full h-[300px] bg-zinc-200/40 p-3 flex justify-center item-center ">
                    {selectedImage && (
                      <Image
                        alt=""
                        width={200}
                        height={200}
                        src={URL.createObjectURL(selectedImage!)}
                        // alt={`Preview ${index + 1}`}
                        className="w-full h-[300px] object-contain "
                        onLoad={() =>
                          URL.revokeObjectURL(
                            URL.createObjectURL(selectedImage!)
                          )
                        } // Clean up memory
                      />
                    )}
                  </div>
                  <div className="flex gap-2 py-4 ">
                    <div>
                      <div className="w-[85px] h-14 bg-zinc-200/40 flex flex-col items-center justify-center">
                        <div
                          className=" cursor-pointer flex flex-col items-center"
                          onClick={() => {
                            styleInput.current?.click();
                          }}
                        >
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            ref={styleInput}
                            onChange={handleImageChange}
                          />
                          <AiOutlineCamera className="text-xl" />
                          <div className=" text-[10px]   font-bold">
                            Select Image
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[350px] flex gap-2 items-center  overflow-x-scroll">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="w-[85px] h-14 bg-zinc-200/40 flex-shrink-0 cursor-pointer relative"
                        >
                          <Image
                            alt=""
                            width={200}
                            height={200}
                            src={URL.createObjectURL(file)}
                            // alt={`Preview ${index + 1}`}
                            className="w-[85px] h-14 object-contain "
                            onLoad={() =>
                              URL.revokeObjectURL(URL.createObjectURL(file))
                            } // Clean up memory
                            onClick={() => {
                              setSelectedImage(file);
                            }}
                          />
                          <div
                            className="absolute right-0 top-0 text-sm rounded-full text-black/45 bg-zinc-200"
                            onClick={() => removeSeletedImg(file)}
                          >
                            <CgClose />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {errors.root && (
                    <div className="text-red-400 text-xs font-bold">
                      {errors.root.message}
                    </div>
                  )}
                  <div className="flex justify-end gap-3 mt-10">
                    <Button
                      btn_text={"Reset"}
                      addtional_class="!w-[70px] !text-yellow-600 !h-[35px] text-xs !p-2 !rounded-md !bg-zinc-300/50"
                    />
                    <Button
                      btn_text={"Submit"}
                      addtional_class="!w-[80px] !h-[35px] text-xs !p-2 !rounded-md"
                      // onclick_event={handleSubmit}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        description={toastData.description}
      />
    </>
  );
}

export default AddProducts;
