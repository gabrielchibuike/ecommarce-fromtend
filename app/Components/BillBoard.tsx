import Image from "next/image";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";

function BillBoard() {
  return (
    <>
      <div className=" w-full max-lg:px-2  flex gap-1">
        <EmblaCarousel />
      </div>
    </>
  );
}

export default BillBoard;
