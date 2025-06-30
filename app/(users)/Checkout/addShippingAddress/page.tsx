"use client";
import Button from "@/app/Components/Button";
import CustomInput from "@/app/Components/CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/Components/CustomSelect";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ToastComponent } from "@/app/Components/Toast";
import { billingDetailScheme } from "@/utils/validationSchema";
import NavBar from "@/app/Components/NavBar";
import SideNav from "@/app/Components/SideNav";
import { TbCurrencyNaira } from "react-icons/tb";
import { createAddress } from "@/utils/checkOutEndPoints";

function AddShippingAddress() {
  const [states, setStates] = useState<string[]>([]);

  const [cities, setCities] = useState<string[]>([]);

  const [toastData, setToastData] = useState({
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  type FormValues = z.infer<typeof billingDetailScheme>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(billingDetailScheme),
  });

  useEffect(() => {
    const fetchStates = async () => {
      const response = await fetch(`https://nga-states-lga.onrender.com/fetch`);
      const data = await response.json();
      setStates(data);
    };
    fetchStates();
  }, []);

  const selectedState = watch("state");

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedState) return setCities([]);
      const response = await fetch(
        `https://nga-states-lga.onrender.com/?state=${selectedState}`
      );
      const data = await response.json();
      setCities(data);
    };
    fetchCities();
  }, [selectedState]);

  const { mutateAsync: formMutation } = useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      console.log(data);
      setToastData({
        description: data.message,
      });
      setIsOpen(true);
      // when form is submitted, reset the form
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
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      streetAddress: data.streetAddress,
      additionalInfo: data.additionalInfo,
      city: data.city,
      state: data.state,
    };

    await formMutation({ formInfo: formInfo });
  };

  return (
    <>
      <NavBar />
      <SideNav />
      <div className="flex">
        <div className="w-full h-screen px-11 pt-20 max-lg:px-2 py-2">
          <form className="bg-white " onSubmit={handleSubmit(onSubmit)}>
            <div className="text-2xl font-bold ">Customer Address</div>
            <div className="w-full flex gap-4 max-lg:flex-col py-4">
              <div className="w-full space-y-4 ">
                <div className="flex gap-5 max-lg:flex-col">
                  <div className="w-full">
                    <CustomInput
                      addtional_class="!bg-zinc-400/5 "
                      input_type="text"
                      placeholder="First Name"
                      label="First Name"
                      // name="firstName"
                      register={register("firstName")}
                      errors={errors.firstName?.message}
                    />
                  </div>
                  <div className="w-full">
                    <CustomInput
                      addtional_class="!bg-zinc-400/5 "
                      input_type="text"
                      placeholder="Last Name"
                      label="Last Name"
                      // name="firstName"
                      register={register("lastName")}
                      errors={errors.lastName?.message}
                    />
                  </div>
                </div>

                <div className="flex gap-5 max-lg:flex-col">
                  <div className="w-full">
                    <CustomInput
                      addtional_class="!bg-zinc-400/5"
                      input_type="text"
                      placeholder="Phone"
                      label="Phone"
                      register={register("phone")}
                      // name="stockQuantity"
                      errors={errors.phone?.message}
                    />
                  </div>
                  <div className="w-full">
                    <CustomInput
                      addtional_class="!bg-zinc-400/5"
                      input_type="text"
                      placeholder="Email"
                      label="Email"
                      register={register("email")}
                      // name="stockQuantity"
                      errors={errors.email?.message}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <CustomInput
                    addtional_class=" !bg-zinc-400/5"
                    input_type="text"
                    placeholder="Street Address"
                    label="Street Address"
                    register={register("streetAddress")}
                    // name="manufacturarBrand"
                    errors={errors.streetAddress?.message}
                  />
                </div>
                <div className="w-full">
                  <CustomInput
                    addtional_class=" !bg-zinc-400/5"
                    input_type="text"
                    placeholder="Additional Info"
                    label="Additional Info"
                    register={register("additionalInfo")}
                    // name="manufacturarBrand"
                    errors={errors.additionalInfo?.message}
                  />
                </div>
                <div className="flex gap-5 max-lg:flex-col">
                  <div className="w-full">
                    <Controller
                      control={control}
                      name="state"
                      rules={{ required: "State is required" }}
                      render={({ field }) => (
                        <>
                          <div className="flex gap-2 items-center">
                            <label className="text-sm text-zinc-800">
                              State
                            </label>
                            <span className="text-sm font-bold text-zinc-800">
                              *
                            </span>
                          </div>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full border border-zinc-600/20 bg-zinc-400/5 py-5 px-3 text-xs text-zinc-500">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-50">
                              {states.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.state && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.state.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <Controller
                      control={control}
                      name="city"
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <>
                          <div className="flex gap-2 items-center">
                            <label className="text-sm text-zinc-800">
                              City
                            </label>
                            <span className="text-sm font-bold text-zinc-800">
                              *
                            </span>
                          </div>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full border border-zinc-600/20 bg-zinc-400/5 py-5 px-3 text-xs text-zinc-500">
                              <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-50">
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.city && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-10">
                  <Button
                    btn_text={"Reset"}
                    addtional_class="!w-[70px] !text-yellow-600 !h-[35px] text-xs !p-2 !rounded-md !bg-zinc-300/50"
                    onclick_event={() => {
                      reset();
                    }}
                  />
                  <Button
                    btn_text={"Save"}
                    addtional_class="!w-[80px] !h-[35px] text-xs !p-2 !rounded-md !bg-primary !text-primary-foreground"
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
              <div className="w-[600px] max-lg:w-full text-zinc-800">
                <div className="w-full max-lg:w-full h-fit bg-zinc-400/5  px-5 py-4">
                  <div className="w-full border-b my-3 py-3 border-primary/25 text-sm font-semibold">
                    ORDER SUMMARY
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="font-semibold">SubTotal</div>
                    <div className="flex gap-2">
                      <div className="flex  items-center py-1">
                        <TbCurrencyNaira className="text-lg" />
                        <h2 className="text-lg font-semibold">3000</h2>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm  ">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center ">
                        <p>Items</p>
                        <p>8</p>
                      </div>
                      <div className="flex justify-between items-center ">
                        <p>Sub Total</p>
                        <p>323</p>
                      </div>
                      <div className="flex justify-between items-center ">
                        <p>Shipping</p>
                        <p>00.0</p>
                      </div>
                    </div>
                    <div className="flex mt-5 justify-between  items-center text-lg">
                      <p>Total</p>
                      <p>00.0</p>
                    </div>
                  </div>
                  <div className="py-3 mt-3">
                    <Button
                      btn_text={"Proceed To Checkout"}
                      addtional_class="!w-full !p-3 !text-md !bg-primary text-primary-foreground"
                      disabled={true}
                      onclick_event={() => {
                        // navigateTo("cart/Checkout");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
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

export default AddShippingAddress;
