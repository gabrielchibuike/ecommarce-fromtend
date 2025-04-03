"use client";
import Link from "next/link";
import React from "react";

function NavNotification() {
  return (
    <>
      <div className="w-full p-1 flex justify-center items-center   bg-primary ">
        <p className="font-poppins font-normal text-sm text-zinc-200 max-lg:text-xs text-center">
          Sign up and GET 20% OFF for your first order{" "}
          <Link href={"#"} className="text-yellow-500 px-4 underline">
            Sign up now
          </Link>
        </p>
      </div>
    </>
  );
}

export default NavNotification;
