/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AiOutlineBehance } from "react-icons/ai";
import Image from "next/image";
import React, { useState } from "react";
import CustomInput from "@/app/Components/CustomInput";
import Button from "@/app/Components/Button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "@/utils/authEndPoint";
import { forgetPasswordSchema } from "@/utils/validationSchema";

function ForgetPassword() {
  const [toastData, setToastData] = useState({
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  type FormValues = z.infer<typeof forgetPasswordSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const { mutateAsync: forgetPasswordMutation } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      window.location.href = "/auth/otp";
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
    console.log(data);

    const formInfo = {
      email: data.email,
    };

    await forgetPasswordMutation({ formInfo: formInfo });
  };
  return (
    <>
      <div className="w-full h-screen flex  p-5">
        <div className="w-full flex  items-center ">
          <div className="w-full space-y-8 px-28 max-lg:px-1">
            <div className="flex items-center gap-1">
              <div className=" w-12 h-12 bg-primary flex justify-center items-center  rounded-full">
                <AiOutlineBehance className="text-3xl text-secondary" />
              </div>
              <h2 className="font-bold text-2xl">Clothing.</h2>
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold space-y-2">
                Forget Password?
              </h1>
              <p className="text- text-zinc-500">
                Don`t worry, We`sll send you reset instrution
              </p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                addtional_class="!w-full !py-4"
                placeholder="Enter email address"
                label="Email"
                errors={errors.email?.message}
                input_type="text"
                register={register("email")}
              />
              <Button
                btn_text={"Submit"}
                addtional_class=" !w-full !bg-primary !py-4 !text-primary-foreground"
              />
            </form>
            <div className="flex items-center justify-center gap-1  ">
              <p className="text-sm">Remember Password?</p>
              <Link
                href={"/auth/signIn"}
                className="text-sm underline text-primary cursor-pointer"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[80%] max-lg:hidden">
          <Image
            src={"/loginImg.png"}
            width={500}
            height={500}
            alt=""
            className="  w-full h-full"
          />
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
