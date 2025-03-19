import { AiOutlineClose } from "react-icons/ai";
import React, { Ref, RefObject } from "react";

function PopUpModel({
  children,
  displayModel,
}: {
  children: React.ReactNode;
  displayModel: RefObject<HTMLDivElement>;
}) {
  const closePopUpModel = () => {
    displayModel.current!.classList.replace("flex", "hidden");
  };
  return (
    <>
      <div
        className={` w-full h-screen bg-[#000000de]  items-end fixed lg:hidden hidden`}
        ref={displayModel}
      >
        <div className="w-full min-h-72 bg-white rounded-tl-2xl rounded-tr-2xl p-2">
          <div
            className="w-full flex justify-end text-xls"
            onClick={closePopUpModel}
          >
            <AiOutlineClose />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default PopUpModel;
