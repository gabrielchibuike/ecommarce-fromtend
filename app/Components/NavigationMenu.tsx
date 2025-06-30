import Link from "next/link";
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
  const categories = {
    Men: {
      Clothing: [
        "Blazers",
        "T-Shirts & Shirts",
        "Jackets & Coats",
        "Jeans",
        "Suits",
        "Sportswears",
        "Shorts",
      ],
      Accessories: ["Shoes", "Foot wears", "Watch"],
    },
    Women: {
      Clothing: [
        "Blazers",
        "T-Shirts & Shirts",
        "Jackets & Coats",
        "Jeans",
        "Suits",
        "Sportswears",
        "Shorts",
      ],
      Accessories: ["Bags", "Shoes", "Juwelleries"],
    },
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "and")
      .replace(/[^\w-]+/g, "");

  return (
    <>
      {isOpen && (
        <div
          className="w-[94%] fixed top-9 right-0 left-10 z-50 h-screen"
          ref={toggleElement}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="w-full h-screen bg-white my-[13px] border shadow-md shadow-[#00000081] max-lg:hidden p-10 flex gap-40">
            {Object.entries(categories).map(([gender, subCategories]) => (
              <div key={gender}>
                <h1 className="text-lg font-semibold capitalize">
                  {gender}&apos;s Wear
                </h1>
                <div className="flex gap-10">
                  {Object.entries(subCategories).map(([productCat, subCat]) => (
                    <div key={productCat}>
                      <h2 className="text-base font-medium py-2">
                        {productCat}
                      </h2>
                      <ul className="space-y-3 py-3 text-sm text-zinc-700 cursor-pointer">
                        {subCat.map((subCat) => (
                          <li key={subCat}>
                            <Link
                              href={`/categories/${slugify(gender)}/${slugify(
                                productCat
                              )}/${slugify(subCat)}`}
                              className="hover:underline"
                            >
                              {subCat}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="w-[300px] h-[400px] bg-black"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavigationMenu;
