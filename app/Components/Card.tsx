import React from "react";

function Card({
  additionalClass,
  children,
}: {
  additionalClass: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={`w-[500px] min-h-[300px] bg-zinc-400 p-2 rounded-lg ${additionalClass}`}
      >
        {children}
      </div>
    </>
  );
}

export default Card;
