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
import { signupSchema } from "@/utils/validationSchema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/utils/authEndPoint";

function SignUp() {
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
    resolver: zodResolver(signupSchema),
  });

  type FormValues = z.infer<typeof signupSchema>;

  const { mutateAsync: createAccMutation } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      setToastData({
        description: data.message,
      });
      setIsOpen(true);
      // when form is submitted, reset the form
      reset();
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
    console.log(data);

    const formInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    await createAccMutation({ formInfo: formInfo });
  };

  return (
    <>
      <div className="w-full min-h-screen flex  p-5">
        <div className="w-full flex  items-center ">
          <div className="w-full space-y-10 px-28 max-lg:px-1">
            <div className="flex items-center gap-1">
              <div className=" w-12 h-12 bg-primary flex justify-center items-center  rounded-full">
                <AiOutlineBehance className="text-3xl text-secondary" />
              </div>
              <h2 className="font-bold text-2xl">Clothing.</h2>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold space-y-2">Sign Up</h1>
              <p className="text- text-zinc-500">
                please fill your detail to access your account.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <CustomInput
                  addtional_class="!w-full !py-4"
                  placeholder="Enter First name"
                  label="First Name"
                  register={register("firstName")}
                  errors={errors.firstName?.message}
                  input_type="text"
                />
                <CustomInput
                  addtional_class="!w-full !py-4"
                  placeholder="Enter Last name"
                  label="Last Name"
                  register={register("lastName")}
                  errors={errors.lastName?.message}
                  input_type="text"
                />
              </div>
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
                <p className="text-right text-sm underline text-primary">
                  Forget Password?
                </p>
              </div>

              <Button
                btn_text={"SignUp"}
                addtional_class="!w-full !bg-primary !py-4 !text-primary-foreground"
              />
            </form>
            <div className="flex items-center justify-center gap-3 py-3">
              <p className="text-sm">Already have an account?</p>
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
            src={"/login-image2.avif"}
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

export default SignUp;
