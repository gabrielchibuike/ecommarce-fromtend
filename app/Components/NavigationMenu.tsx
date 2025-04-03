import React, { RefObject } from "react";

function NavigationMenu({
  toggleElement,
  isOpen,
  setIsOpen,
}: {
  toggleElement: RefObject<HTMLDivElement>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* This is the navigation menu */}
      {isOpen && (
        <div
          className=" w-[94%] fixed top-9 right-0 left-10 z-50  h-screen"
          ref={toggleElement}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div
            className="w-full  h-screen bg-white my-[13px] border shadow-md shadow-[#00000081] 
             max-lg:hidden p-10 flex gap-40"
          >
            <div>
              <h1 className="text-lg font-semibold">Men's Wear</h1>
              <div className="flex gap-10 ">
                <div>
                  <h2 className="text-base font-medium py-2">Clothings</h2>
                  <ul className="space-y-3 py-3 text-sm text-zinc-700 cursor-pointer">
                    <li>Blazers</li>
                    <li>T-Shirts & Shirts</li>
                    <li>Jackets & Coats</li>
                    <li>Jeans</li>
                    <li>Suits</li>
                    <li>Sportswears</li>
                    <li>Shorts</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-base font-medium py-2">Accessories</h2>
                  <ul className="space-y-3 py-3 text-sm text-zinc-700 cursor-pointer">
                    <li>Shoes</li>
                    <li>Foot wears</li>
                    <li>watch</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Women's Wear</h1>
              <div className="flex gap-10 ">
                <div>
                  <h2 className="text-base font-medium py-2">Clothings</h2>
                  <ul className="space-y-3 py-3 text-sm text-zinc-700 cursor-pointer">
                    <li>Blazers</li>
                    <li>T-Shirts & Shirts</li>
                    <li>Jackets & Coats</li>
                    <li>Jeans</li>
                    <li>Suits</li>
                    <li>Sportswears</li>
                    <li>Shorts</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-base font-medium py-2">Accessories</h2>
                  <ul className="space-y-3 py-3 text-sm text-zinc-700 cursor-pointer">
                    <li>Bags</li>
                    <li>Shoes</li>
                    <li>Juwelleries</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-[300px] h-[400px] bg-black"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavigationMenu;
