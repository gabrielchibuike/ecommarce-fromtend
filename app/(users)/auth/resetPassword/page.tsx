/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { AiOutlineBehance } from "react-icons/ai";
import Image from "next/image";
import React, { useState } from "react";
import CustomInput from "@/app/Components/CustomInput";
import Button from "@/app/Components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword, resetPassword } from "@/utils/authEndPoint";
import {
  forgetPasswordSchema,
  newPasswordSchema,
} from "@/utils/validationSchema";
import { DecodeJwt } from "@/app/reuseableComponent/DecodeJwt";
function ResetPassword() {
  const [toastData, setToastData] = useState({
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  type FormValues = z.infer<typeof newPasswordSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(newPasswordSchema),
  });

  const { mutateAsync: resetPasswordMutation } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      window.location.href = "/auth/signIn";
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
    const email = await DecodeJwt();
    const formInfo = {
      email: email?.email,
      password: data.password,
    };

    await resetPasswordMutation({ formInfo: formInfo });
  };
  return (
    <>
      <div className="w-full h-screen flex  p-5">
        <div className="w-full flex  items-center ">
          <div className="w-full space-y-10 px-28 max-lg:px-1">
            <div className="flex items-center gap-1">
              <div className=" w-12 h-12 bg-primary flex justify-center items-center  rounded-full">
                <AiOutlineBehance className="text-3xl text-secondary" />
              </div>
              <h2 className="font-bold text-2xl">Clothing.</h2>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold space-y-2">
                Set new Password?
              </h1>
              <p className="text- text-zinc-500">
                Must be at least 8 character
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                addtional_class="!w-full !py-4"
                placeholder="Enter password"
                label="New Password"
                errors={errors.password?.message}
                input_type="text"
                register={register("password")}
              />
              <CustomInput
                addtional_class="!w-full !py-4"
                placeholder="Enter password"
                label="Confirm Password"
                errors={errors.confirmPassword?.message}
                input_type="text"
                register={register("confirmPassword")}
              />
              <Button
                btn_text={"Submit"}
                addtional_class=" !w-full !bg-primary !py-4 !text-primary-foreground"
              />
            </form>
            <div className="flex items-center justify-center gap-1  ">
              <p className="text-sm">Remember Password?</p>
              <p className="text-sm underline text-primary cursor-pointer">
                Sign In
              </p>
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

export default ResetPassword;
