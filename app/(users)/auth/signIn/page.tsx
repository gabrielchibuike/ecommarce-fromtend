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
import { loginSchema } from "@/utils/validationSchema";
import { login } from "@/utils/authEndPoint";
import useCustomRouter from "@/app/hooks/useCustomRouter";

function SignIn() {
  const { navigateTo } = useCustomRouter();

  const [toastData, setToastData] = useState({
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  type FormValues = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: createAccMutation } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // console.log(data.data);
      localStorage.setItem("Access_Token", JSON.stringify(data.data));
      setToastData({
        description: data.message,
      });
      setIsOpen(true);
      // when form is submitted, reset the form
      reset();

      navigateTo("/");
    },
    onError: (error) => {
      console.log(error);

      setToastData({
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        description: error?.message!,
      });
      setIsOpen(true);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formInfo = {
      email: data.email,
      password: data.password,
    };

    await createAccMutation({ formInfo: formInfo });
  };

  return (
    <>
      <div className="w-full min-h-screen flex  p-5">
        <div className="w-full flex  items-center ">
          <div className="w-full space-y-10 px-28  max-lg:px-1">
            <div className="flex items-center gap-1">
              <div className=" w-12 h-12 bg-primary flex justify-center items-center  rounded-full">
                <AiOutlineBehance className="text-3xl text-secondary" />
              </div>
              <h2 className="font-bold text-2xl">Clothing.</h2>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold space-y-2">Sign In</h1>
              <p className="text- text-zinc-500">
                please fill your detail to access your account.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                addtional_class="!w-full !py-4"
                placeholder="Enter email address"
                label="Email"
                register={register("email")}
                errors={errors.email?.message}
                input_type="text"
              />
              <CustomInput
                addtional_class="!w-full !py-4"
                placeholder="Enter your password"
                label="Password"
                register={register("password")}
                errors={errors.password?.message}
                input_type="text"
              />

              <div>
                <Link
                  href={"/auth/forgetPassword"}
                  className="flex justify-end text-sm underline text-primary"
                >
                  Forget Password?
                </Link>
              </div>

              <Button
                btn_text={"SignIn"}
                addtional_class="!w-full !bg-primary !py-4 !text-primary-foreground"
              />
            </form>
            <div className="flex items-center justify-center gap-3  ">
              <p className="text-sm">Don&apos;t have an account?</p>
              <Link
                href={"/auth/signUp"}
                className="text-sm underline text-primary cursor-pointer"
              >
                Sign Up
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

export default SignIn;
