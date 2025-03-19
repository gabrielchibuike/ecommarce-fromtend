"use client";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ContextApi } from "../GlobalState/Context";

function AdminFilterModel() {
  const { toggleAdminFilterModel } = useContext(ContextApi);

  function closePopUpFilterModel() {
    setTimeout(() => {
      toggleAdminFilterModel.current?.classList.replace("block", "hidden");
    }, 300);
    toggleAdminFilterModel.current?.classList.replace(
      "translate-x-0",
      "translate-x-full"
    );
    // document.body.classList.remove("overflow-hidden");
  }
  return (
    <>
      <div className="w-full">
        <div
          className="w-[250px] max-lg:w-full h-screen bg-white fixed top-0 right-0 transition translate-x-full ease-linear hidden  text-black z-50  p-3"
          ref={toggleAdminFilterModel}
        >
          <div
            className="cursor-pointer max-lg:text-2xl "
            onClick={closePopUpFilterModel}
          >
            <AiOutlineClose />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminFilterModel;
